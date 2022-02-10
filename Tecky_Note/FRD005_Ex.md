# 2021-12-10 Exercise

- why we need redux
- how to implement/setup redux
- state, reducer, action

## Setup Steps

- [ ] installation

```bash
yarn add redux react-redux @types/react-redux

```

- [ ] 1. create store file

store: 貨倉
state -> 貨架
reducer -> 理貨員
action -> 貨單
貨單 -> dispatch -> 理貨員

- [ ] create folder for specified 貨架
- [ ] `state.ts` - 貨架上貨物 Type
- [ ] `reducers.ts` - (Reducers) 理貨員 for 指定貨架
- [ ] `actions.ts` - Functions to create (Actions) 貨單

- [ ] 2. Provider
- [ ] 3. useSelector()
