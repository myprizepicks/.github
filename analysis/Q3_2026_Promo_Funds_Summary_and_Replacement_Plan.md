# Q3 2026 Promo Funds: Summary & Replacement Plan

**Dataset:** 9 CSV parts (`promo_fund_credits_q3_2026_part01`–`part09`)  
**Period covered:** 2026-07-01 → 2026-09-17 (ET) — nearly all of Q3; September is incomplete through month-end  
**Scope:** Promo-fund **credits only** (no redemptions, plays, or expirations in this extract)

---

## Executive answer

| Metric | Value |
|--------|------:|
| **Total promo funds credited (Q3 to date)** | **$7,991,360.89** |
| Transactions | 186,409 |
| Unique users credited | 149,908 |
| Avg credit | $42.87 |
| Duplicate transaction IDs | 0 |

Supporting rollups live in `analysis/q3_2026_*.csv`.

---

## Breakdown by `transaction_type` / `source`

Each `transaction_type` maps 1:1 to a `source` in this extract:

| transaction_type | source | Txns | Users | Total $ | % of $ | Avg $ | Median $ |
|------------------|--------|-----:|------:|--------:|-------:|------:|---------:|
| `referral_bonus` | Referral bonus | 55,782 | 45,568 | **$2,557,525.00** | 32.0% | $45.85 | $50.00 |
| `pp_adjustment` | Admin adjustment | 2,252 | 1,261 | **$1,998,965.93** | 25.0% | $887.64 | $100.00 |
| `promo_added` | Promo dash bulk upload | 11,435 | 2,380 | **$1,212,115.00** | 15.2% | $106.00 | $75.00 |
| `deposit_matched` | Deposit match | 86,539 | 80,222 | **$1,116,251.66** | 14.0% | $12.90 | $6.25 |
| `new_member_offer` | New member offer | 30,401 | 30,385 | **$1,106,503.30** | 13.8% | $36.40 | $50.00 |
| **Total** | | **186,409** | **149,908** | **$7,991,360.89** | **100%** | | |

### How funds were issued (`credited_by_kind`)

| credited_by_kind | Txns | Total $ | Notes |
|------------------|-----:|--------:|-------|
| `system` | 172,722 | $4,780,279.96 | Automated: referrals, deposit matches, new-member offers |
| `admin` | 13,687 | $3,211,080.93 | Manual: `pp_adjustment` + `promo_added` bulk uploads |

**~40% of dollars** are admin-initiated; **~60%** are system promotions. Admin dollars are far more concentrated per transaction.

### By `object_type`

| object_type | Txns | Total $ |
|-------------|-----:|--------:|
| User (referrals) | 55,782 | $2,557,525.00 |
| Promotion (deposit match + new member) | 116,940 | $2,222,754.96 |
| Adjustment (admin) | 2,252 | $1,998,965.93 |
| BulkBalanceAdjustment | 11,435 | $1,212,115.00 |

---

## Monthly trend

| Month | Txns | Users | Total $ |
|-------|-----:|------:|--------:|
| 2026-07 | 153,793 | 127,518 | **$5,246,827.92** |
| 2026-08 | 17,683 | 12,867 | $1,724,392.28 |
| 2026-09 (through 17th) | 14,933 | 13,631 | $1,020,140.69 |

July is ~66% of YTD Q3 dollars, driven almost entirely by **referral bonuses that appear only in July** ($2.56M) plus elevated deposit-match and new-member volume.

| Month | deposit_matched | new_member_offer | pp_adjustment | promo_added | referral_bonus |
|-------|----------------:|-----------------:|--------------:|------------:|---------------:|
| Jul | $1,017,430 | $507,098 | $765,954 | $398,820 | **$2,557,525** |
| Aug | $80,230 | $221,168 | $821,204 | $601,790 | $0 |
| Sep* | $18,591 | $378,237 | $411,808 | $211,505 | $0 |

\*Partial month.

---

## Segment detail

### 1. Referral bonus — $2.56M (largest bucket)

- 55,782 credits; all between Jul 1–Jul (no Aug/Sep referral credits in file)
- Amount mix: **$50** (49,288), **$10** (4,615), **$25** (1,879)
- Every row has a `referred_user_id`; 45,568 unique referrers
- Fully system-credited; liability sits as promo balance until spent or manually expired

### 2. Admin adjustment (`pp_adjustment`) — $2.00M (highest $/txn)

- Only 2,252 txns but **25% of all dollars**; mean $888, p99 $20k, max **$50,000**
- Top reason: **Promo Balance Adjustment - Other** → $1.73M (1,566 txns)
- Other reasons (VIP, social giveaways, reinstatements, zero-outs) are comparatively small
- Extreme concentration: top users received $50k–$194k individually in the quarter
- Top 1% of all credited users account for **~38%** of total promo dollars (skewed by this channel)

This is the clearest “balance-sheet and ops pain” channel: large, discretionary, sticky promo balances that later need manual expiry/zero-out.

### 3. Promo dash bulk upload (`promo_added`) — $1.21M

- 11,435 credits to 2,380 users; typical amounts $25–$150 (median $75)
- Almost entirely one operator (Matthew West: $1.18M / 11,075 txns); secondary Kevin Kornecki ($36k)
- No structured `reason`/`note` in the extract — hard to audit campaign intent after the fact

### 4. Deposit match — $1.12M (highest volume)

- 86,539 automated credits across **40** `DepositMatch` promotions
- Small tickets (median **$6.25**, avg $12.90, max $200)
- Categories (by promotion name):

| Category | Txns | Total $ | Avg $ |
|----------|-----:|--------:|------:|
| Account Zero | 36,363 | $297,116 | $8.17 |
| Withdrawal reactivation | 10,073 | $266,857 | $26.49 |
| Second deposit | 19,104 | $253,533 | $13.27 |
| Inactivity | 15,548 | $224,974 | $14.47 |
| Third deposit | 5,451 | $73,772 | $13.53 |

Largest single promotions by $: Withdrawal General Deposit H+ LTV 50% ($133k), Second Deposit L 50% ($113k), Account Zero M/H LTV 25% variants.

### 5. New member offer — $1.11M

| Offer (reason) | Txns | Total $ | Avg $ |
|----------------|-----:|--------:|------:|
| New Member Play $5 Get $50 in Promo | 13,062 | $653,100 | $50.00 |
| New Member Deposit Match | 17,339 | $453,403 | $26.15 |

---

## What the data implies about the problem

1. **Promo funds are a durable liability.** Credits are booked immediately; nothing in this extract expires them. Ops later burns capacity on `Zero Out Balance - Promo` and similar adjustments.
2. **Two very different products are mixed in one ledger:**
   - High-volume, low-ticket automated acquisition/retention (deposit match, NMO, referrals)
   - Low-volume, high-ticket discretionary VIP/bulk grants (admin + promo dash) that dominate dollars and concentration risk
3. **July referral spend alone ($2.56M) shows campaign spikes can dominate the quarter** and leave a large residual balance sheet if unused.
4. **Manual issuance is poorly structured** (`Promo Balance Adjustment - Other`, blank notes on bulk uploads), which makes sunset and ROI measurement harder.

---

## Plan of action: stop offering promo funds → bonus lineup promotions

### Goal

Replace upfront promo-balance grants with **bonus lineup promotions**: users receive a promotional entry; **payout is credited only if the lineup wins**; unused/losing entries **expire with the contest** — no lingering promo wallet liability and no manual expiry campaigns.

### Design principles

| Principle | Promo funds (today) | Bonus lineup (target) |
|-----------|---------------------|------------------------|
| When liability is created | On credit | On **win settlement** only (or contingent liability at entry, cleared on loss/expiry) |
| Expiry | Manual / resource-intensive | Inherent (contest end / unused entry TTL) |
| User mental model | Free wallet balance | Free / discounted lineup shot |
| Abuse surface | Transferable wallet value until spent | Bounded to one promotional entry |
| Ops | Bulk upload, admin adjust, zero-out | Campaign config + automated settlement |

### Phase 0 — Align & measure (1–2 sprints of org work)

1. **Finance / Accounting:** Agree recognition: promo funds today vs contingent bonus-lineup liability; target journal entries for win credit vs loss/expire.
2. **Define success metrics:** promo liability balance (target → 0 net new), cost per activated user, incremental GGR, % of promo $ that converts to play before 30/60/90 days, ops hours on expiry/zero-out.
3. **Inventory open promo balances** (not in this credit-only file): outstanding $ by cohort/source; estimate “zombie” balances that will need a wind-down.

### Phase 1 — Product & engineering: bonus lineup as the default incentive vehicle

1. **Ship / harden bonus lineup promo type**
   - Configurable: sport/slate, entry fee covered (or partial), max entries, eligibility, geo, LTV segment
   - Clear UX: “Bonus lineup — pays in credit if it hits; expires when the contest locks/settles”
   - Settlement: win → **withdrawable or playable credit** (product choice); loss/void/unused → auto-expire; **never** write a persistent promo-wallet grant up front
2. **Ledger & reporting**
   - New transaction types distinct from `deposit_matched` / `promo_added` / `pp_adjustment`
   - Dashboards: issued entries, win rate, credit paid, expired entries, liability = unsettled winning entries only
3. **Fraud / limits:** per-user caps, device/payment velocity, VIP override workflow with approval thresholds (replace $30k–$50k discretionary promo dumps)

### Phase 2 — Map each current source to a replacement (or kill)

| Current source | ~Q3 $ | Replacement |
|----------------|------:|-------------|
| Referral bonus | $2.56M | Referrer + referee get **bonus lineup entries** (or credit-on-win milestones) after qualifying play — not $50 promo wallet |
| New Member Play $5 Get $50 | $0.65M | “Play $5 → unlock N bonus lineups totaling ≤$50 EV” or single higher-EV bonus lineup; payout only on wins |
| New Member Deposit Match | $0.45M | Deposit unlocks **matched value as bonus lineup bank** (e.g. $X in bonus entries), not deposit-matched promo balance |
| Deposit match (Account Zero / inactivity / withdrawal / 2nd–3rd deposit) | $1.12M | Same pattern: reactivation/deposit triggers **eligible bonus lineups** sized to LTV tier instead of % DB promo credit |
| Promo dash bulk upload | $1.21M | Campaign tool issues **bonus lineup codes/assignments**; kill free-form CSV wallet top-ups for marketing |
| Admin VIP / “Promo Balance Adjustment - Other” | $1.73M+ | VIP toolkit: curated bonus lineups, loss-rebate as **next-lineup bonus**, hospitality — require dual approval above $Y; ban raw promo balance as default |

### Phase 3 — Sunset sequence (reduce risk of cliff in conversion)

1. **Freeze net-new promo wallet grants** for marketing (bulk upload + non-remedial admin) once bonus lineup parity exists for top 5 campaigns.
2. **Turn off deposit-match → promo balance** promotion configs; clone as bonus-lineup campaigns in staging → % traffic ramp (10% → 50% → 100%) with holdout for lift.
3. **Rewrite NMO & referral** to bonus lineup; keep temporary hybrid only if legal/CRM requires a bridge message.
4. **Remedial exceptions only** for `pp_adjustment`: fraud indemnity, resettlement, true corrections — not acquisition/VIP value transfer. Rename reasons; remove “Other” as a catch-all.
5. **Existing balance wind-down**
   - Communicate: promo balances expire on date D (or convert 1:1 into time-boxed bonus lineup bank that itself expires)
   - Automate expiry job (the current manual pain point) **once**, then delete the process
   - Do not “fix” by granting more promo funds

### Phase 4 — Ops & governance

1. **Kill promo dash bulk wallet upload** for growth; replace with bonus-lineup assignment UI + audit log.
2. **Approval matrix:** any discretionary credit > threshold requires Finance + Compliance; VIP program has monthly budget in bonus-lineup EV, not open-ended wallet grants.
3. **Runbooks:** remove “zero out promo balances” as a recurring chore; keep only incident/remediation playbooks.
4. **CRM / creative:** retrain language from “$50 promo funds” → “$50 in bonus lineups” / “free entries that pay if you hit.”

### Phase 5 — Controls & watchouts

- **EV management:** bonus lineups can be more expensive per engaged user if win rates are high — price entry subsidy to target promo margin, not face-value wallet grant.
- **State / compliance:** confirm promotional entry and credit-on-win treatment per jurisdiction (some markets treat free entries differently from deposited promo cash).
- **User trust:** clear expiry copy avoids “you took my promo money” support load when migrating off wallet balances.
- **Partial September data:** re-run this rollup after 2026-09-30 before locking annual forecasts.

### Suggested 90-day outcome targets

- Net new promo-wallet liability from marketing channels: **~$0**
- ≥80% of former deposit-match / NMO / referral incentive $ replaced by bonus-lineup EV
- Admin `Promo Balance Adjustment - Other` $ down **>90%** QoQ
- Ops hours on promo expiry / zero-out: **near zero** after one-time wind-down
- Holdout shows acquisition/retention KPIs within agreed tolerance of old promo-fund baseline

---

## Files in this folder

| File | Contents |
|------|----------|
| `q3_2026_by_transaction_type_source.csv` | Primary rollup |
| `q3_2026_by_month_transaction_type.csv` | Monthly × type |
| `q3_2026_deposit_match_promotions.csv` | All 40 deposit-match promotions |
| `q3_2026_new_member_offer_reasons.csv` | NMO split |
| `q3_2026_pp_adjustment_reasons.csv` | Admin reason codes |
| `q3_2026_by_credited_by_kind.csv` | System vs admin |

---

## Bottom line

**PrizePicks credited about $8.0M in promo funds from Jul 1–Sep 17, 2026.** Roughly one-third was July referral bonuses, one-quarter was high-ticket admin adjustments, and the rest split across bulk uploads, deposit matches, and new-member offers. Replacing upfront wallet grants with **win-contingent, self-expiring bonus lineups**, sunsetting bulk/admin wallet top-ups, and running a one-time automated wind-down of residual balances is the direct path off the balance-sheet and manual-expiry treadmill.
