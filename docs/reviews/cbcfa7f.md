# Independent checker report

Reviewer: separate fresh-context Codex subagent `review_fruit_merge`, GPT-6-astra. Received 2026-10-04. The report below is preserved from the reviewer; the response follows it.

Independent review of `c941d33..cbcfa7fd8e00d0d5302e57ca35ba1ead8d9b0232`, performed read-only on 2026-10-04. Assessment: **request changes for one confirmed gameplay defect**.

**Finding — P1: image resizing shrinks the collision bodies**

Location: `src/game/physics/matter-adapter.ts:13`.

`setCircle(def.radius)` creates the intended body, but the following `setDisplaySize(def.radius*2, def.radius*2)` also scales that body. Textures are loaded at 128×128, so the collision geometry is multiplied by `2*radius/128`. This affects every spawned and merged fruit.

I reproduced this with the installed Phaser `Transform`, `Size`, and Matter `Bodies` implementations:

| Catalog radius | Image width | Actual body width |
|---:|---:|---:|
| 12 | 24 | 4.346625 |
| 18 | 36 | 9.9714375 |
| 55.5 | 111 | 95.555391 |

For rank 1, a Matter simulation against the configured floor at y=696 settled the center at y=693.876688. Its displayed image extends to y=705.876688. Fruits therefore visibly overlap the floor and one another, and equal fruits require excessive visual overlap before merging. Danger sampling also subtracts the catalog radius rather than the much smaller physical extent.

Reproduction: create a radius-12 body with the installed Phaser components and a 128×128 frame, apply `setDisplaySize(24,24)`, and inspect its vertices/bounds. The body width changes from approximately 23.182 to 4.347 pixels. Stepping that body against `Bodies.rectangle(240,708,480,24,{isStatic:true})` reproduces the floor overlap.

Suggested fix: set the display size before creating the final circle body, keeping material settings after body creation. Add a regression that inspects actual collision geometry at low and high ranks and checks settling against the floor. This concerns the agreed physics design and FR-02/FR-03/FR-06. The current vertically aligned merge scenario still passes with undersized bodies, explaining why existing checks miss it.

**Strengths**

- Both participants are reserved before world mutation. Duplicate, reversed, self, and shared-participant collisions are correctly rejected; the tests cover triples and chains.
- Danger calculation correctly handles the grace-period fraction, strict thresholds, timer reset/removal, and paused state.
- Coordinate conversion uses current canvas geometry; outside releases and secondary pointers are rejected, and blocked drops preserve the queue.
- Storage parsing and exceptions are contained; the session maintains its in-memory best score when persistence fails.
- Restart clears pending merges, bodies, input state, timers, and cooldown. Generation-prefixed IDs prevent old body IDs from matching new fruit.
- Production and E2E builds use separate output directories. The compile-time condition removes the test API import from production, with bundle scanning and production smoke coverage.

**Evidence and limitations**

I reviewed the requirements, design, plan, repository instructions, production modules, tests, build/check configuration, CI, asset generator/register, and relevant installed Phaser internals. All 30 catalog asset paths exist.

The parent’s `check-round2.log` records 68 unit tests, 4 integration tests, both builds, and 22 browser scenarios passing. I inspected that log; I did not independently rerun the full check or start competing Playwright servers.

The following are coverage limitations, not additional confirmed defects: the visibility test dispatches a synthetic visibility event; restart coverage checks listener count and subsequent drop but does not explicitly replay a captured old collision callback; velocity conversion lacks the planned empirical displacement test. The inspected implementation is consistent with the intended behavior in these areas.

The evidence index and current-state document still describe the preparation stage at the reviewed revision. They need reconciliation before a final acceptance claim; this is documentation work rather than another gameplay finding.

**Declined-to-judge list**

- Physical-phone behavior and manual visual acceptance: no firsthand device run in this review.
- Long-session balance and high-rank practical reachability: automated synthetic scenes cannot establish these.
- Video, public repository/PR access, and learning-platform submission: outside this code-review pass.

No repository files or branches were changed by the reviewer. This assessment applies to the specified SHA; subsequent author fixes require verification.

## Відповідь автора реалізації

Знахідку P1 прийнято. [Regression test commit](https://github.com/DmitryyR/fruit-merge-capstone/commit/f224a78) перевіряє фактичну ширину тіл усіх 30 рівнів. [Red log](../evidence/runs/review-physics-red.log) показав 4.346625 px замість >22.56 для першого рівня. [Fix e77427a](https://github.com/DmitryyR/fruit-merge-capstone/commit/e77427a) змінює порядок display sizing → circle → material properties. Фінальний прогін зберігається в [final-check.log](../evidence/runs/final-check.log); це авторська верифікація виправлення, не повторне незалежне рев'ю.

Рішення щодо меж рев'ю: реальний телефон і тривалий баланс не заявляємо перевіреними; подання й відео відстежуємо окремо. Неперевірені сценарії явно зазначені в acceptance report. Відкладених minor-знахідок немає.
