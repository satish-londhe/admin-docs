---
sidebar_position: 3
title: "Tickets and Rate Limiting"
tags: ["platform", "security", "rate-limiting", "tickets", "feedback", "global-settings"]
---

# Tickets and Rate Limiting

CMP includes **admin-configurable rate limiting** for support ticket creation and feedback submission. Limits control how many records a user can create within a configured time window.

Limits are changed from **Admin Panel → Global Settings** — no code deployment is required.

## What is rate limited

| Flow | Global setting key | Default |
|---|---|---|
| **Ticket creation** | `ticket_rate_limit` | `10-fixed-1h` |
| **Feedback submission** | `feedback_rate_limit` | `5-fixed-1d` |

Rate limits apply **per user account**. When one user reaches their limit, other users are unaffected.

---

## Configuration settings

**Path:** **Admin Panel → Global Settings**

### Ticket rate limit

| Setting | Value |
|---|---|
| **Flag name** | `ticket_rate_limit` |
| **Default** | `10-fixed-1h` |

Controls how many tickets a user can create within the configured time window.

| Example value | Meaning |
|---|---|
| `5-fixed-1h` | Maximum **5** tickets in the current **fixed 1-hour** bucket. Bucket resets every hour (for example 10:00–10:59, 11:00–11:59). |
| `10-fixed-6h` | Maximum **10** tickets in the current **fixed 6-hour** bucket (for example 00:00–05:59, 06:00–11:59, 12:00–17:59, 18:00–23:59). |
| `25-fixed-7d` | Maximum **25** tickets in the current **fixed 7-day** bucket within the month (for example days 01–07, 08–14, 15–21, 22–month end). |
| `5-rolling-1h` | Maximum **5** tickets in the **last rolling 1 hour**. The window moves continuously with current time (for example 09:25 → 10:25). |
| `50-rolling-7d` | Maximum **50** tickets in the **last rolling 7 days**. The window moves forward based on current time. |

### Feedback rate limit

| Setting | Value |
|---|---|
| **Flag name** | `feedback_rate_limit` |
| **Default** | `5-fixed-1d` |

Controls how many feedback submissions a user can create within the configured time window. The same value patterns as ticket rate limiting apply.

| Example value | Meaning |
|---|---|
| `5-fixed-1h` | Maximum **5** submissions in the current fixed 1-hour bucket. |
| `10-fixed-6h` | Maximum **10** submissions in the current fixed 6-hour bucket. |
| `25-fixed-7d` | Maximum **25** submissions in the current fixed 7-day bucket within the month. |
| `5-rolling-1h` | Maximum **5** submissions in the last rolling 1 hour. |
| `50-rolling-7d` | Maximum **50** submissions in the last rolling 7 days. |

---

## General rules

* Set the value to **`null`** or leave it **empty** to **disable** rate limiting for that flow.
* The value must strictly follow: **`{limit}-{fixed|rolling}-{duration}{unit}`**
* **Invalid formats are ignored** — rate limiting is not applied, and requests are not blocked because of a bad setting.

:::warning[No format validation in Global Settings UI]

CMP does **not** validate rate-limit strings when you save Global Settings. Enter the correct format manually. If the format is wrong, the setting is **silently ignored** and no rate limit is enforced.

:::

---

## Format explanation

| Part | Description | Example |
|---|---|---|
| `{limit}` | Maximum allowed requests | `5` |
| `{window_type}` | Window type | `fixed` or `rolling` |
| `{duration}` | Time duration | `1`, `6`, `24`, `7` |
| `{unit}` | Time unit | `h` = hour, `d` = day |

**Valid examples:**

* `5-fixed-1h`
* `10-fixed-6h`
* `5-fixed-7h`
* `10-fixed-1d`
* `25-fixed-7d`
* `5-rolling-1h`
* `10-rolling-24h`
* `50-rolling-7d`

---

## Fixed windows (`fixed`)

Fixed windows use **predefined repeating buckets**. All requests inside the same bucket count toward the limit. When the bucket changes, the counter resets. Fixed windows are **not** sliding windows.

Implementation notes:

* Hour-based windows align from **`startOfDay()`** (midnight).
* Day-based windows align from **`startOfMonth()`**.

### Fixed hour window

**Example:** `5-fixed-1h`

* Maximum **5** requests per **1-hour** bucket.
* **Logic:** `bucketStartHour = floor(currentHour / duration) × duration`

**Example buckets:**

| Bucket |
|---|
| 00:00 → 00:59 |
| 01:00 → 01:59 |
| 10:00 → 10:59 |

Buckets are aligned from midnight and **never cross a day boundary**.

### Fixed multi-hour window

**Example:** `10-fixed-6h`

* Maximum **10** requests per **6-hour** bucket.

| Bucket |
|---|
| 00:00 → 05:59 |
| 06:00 → 11:59 |
| 12:00 → 17:59 |
| 18:00 → 23:59 |

**7-hour bucket example:** `5-fixed-7h`

| Bucket |
|---|
| 00:00 → 06:59 |
| 07:00 → 13:59 |
| 14:00 → 20:59 |
| 21:00 → 23:59 |

The **last bucket of the day may be shorter** than the configured duration if 24 hours does not divide evenly. Buckets **never cross midnight**.

### Fixed day window

**Example:** `10-fixed-1d`

* Maximum **10** requests per **calendar day**.
* **Logic:** `bucketStartDay = floor((currentDay − 1) / duration) × duration + 1`

**Example:** 24 May 00:00 → 24 May 23:59

Uses the month as a boundary reference. Each bucket represents a real calendar day and **never crosses a month boundary**.

### Fixed multi-day window

**Example:** `25-fixed-7d`

* Maximum **25** requests per **7-day** bucket within the current month.

| Bucket (example month) |
|---|
| Day 1 → Day 7 |
| Day 8 → Day 14 |
| Day 15 → Day 21 |
| Day 22 → Month end |

The **last bucket of the month may be shorter** if the month ends before a full group completes. Buckets **never cross a month boundary**.

---

## Rolling windows (`rolling`)

Rolling windows are **sliding** windows based on current time. They move continuously and do **not** reset at fixed clock boundaries.

**Logic:**

* `startTime = now − duration`
* `endTime = now`

### Rolling hour window

**Example:** `5-rolling-1h` — maximum **5** requests in the last **1 hour** (for example 09:25 → 10:25).

### Rolling multi-hour window

**Example:** `10-rolling-24h` — maximum **10** requests in the last **24 hours** (for example 21 May 18:30 → 22 May 18:30).

### Rolling day window

**Example:** `50-rolling-7d` — maximum **50** requests in the last **7 days** (for example 15 May 18:30 → 22 May 18:30).

### How rolling windows move

If the current time is **24 May 2026 10:25**, then `5-rolling-1h` checks records between **24 May 2026 09:25** and **24 May 2026 10:25**.

Ten minutes later, the window becomes **24 May 2026 09:35 → 24 May 2026 10:35** — it **continuously moves forward** with time.

**Key points:**

* Rolling windows do **not** reset at fixed times.
* Any supported duration and unit can be used.
* The system always counts records created within the recent sliding range.

---

## Fixed vs rolling — summary

| | Fixed (`fixed`) | Rolling (`rolling`) |
|---|---|---|
| **Window type** | Repeating buckets | Sliding window from current time |
| **Reset** | When the bucket changes | Continuously moves — no fixed reset time |
| **Hour alignment** | Midnight-aligned slots; never crosses midnight | Last N hours from `now` |
| **Day alignment** | Calendar days or day groups within the month | Last N days from `now` |
| **Last slot** | May be shorter if duration does not divide evenly | N/A — always exactly N hours/days back |

---

## Error handling

The system **fails open** on invalid or empty configuration — requests continue normally without rate limiting.

| Configuration | Result |
|---|---|
| `null` | Rate limiting **disabled** |
| Empty string | Rate limiting **disabled** |
| `5-fixed` | **Invalid** — ignored safely |
| `abc` | **Invalid** — ignored safely |
| `5-random-1h` | **Invalid** window type — ignored safely |

---

## Configure

1. Open **Admin Panel → Global Settings**.
2. Search for **`ticket_rate_limit`** and/or **`feedback_rate_limit`**.
3. Enter a value in the format **`{limit}-{fixed\|rolling}-{duration}{unit}`**, or leave empty / set to **`null`** to disable.
4. Save. Changes take effect **immediately** — no restart required.
5. Test with a test account: submit tickets or feedback until the limit is reached and confirm the expected block behaviour.

---

## Related

* [Security overview](/platform-features/security/)
* [User Enumeration Protection](/platform-features/security/user-enumeration) — login and Forgot Password rate limits
* [Global Settings](/platform-features/global-settings/)
* [Platform Features](/platform-features/)
