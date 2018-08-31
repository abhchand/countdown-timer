# Countdown Timer

A simple countdown timer to important events!

![Countdown Timer](https://gitlab.com/abhchand/countdown-timer/raw/master/meta/screenshot.png)

## Quick Start

Define events to countdown to as an environment variable

```
export COUNTDOWN_EVENTS="[
  {\"month\":9,\"date\":18,\"name\":\"Anniversary\"},
  {\"month\":4,\"date\":12,\"name\":\"Bday\"},
  {\"month\":2,\"date\":14,\"name\":\"Valentine's Day\"},
  {\"month\":12,\"date\":25,\"name\":\"X-mas\"}
]"
```

Build

```
npm run prod
```

Run

```
open src/index.html
```
