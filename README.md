## 运行

```bash
$ docker compose up -d
```
## 访问

```bash
http://localhost:3000/api
```

## 实现消息提醒任务即将到期

- 方案一 可采用定时任务轮询的方式，不停查询即将到期的任务，然后给出消息提醒，此方案适合数据量较小时使用
- 方案二 单独建个表，按照任务到期时间顺序存放任务的id，以时间戳秒数为主键id，这样可以避免检索task全表，
- 方案三 基于redis key过期事件来实现，此方案不能保证100%可靠
- 方案四 基于RabbitMQ的延迟队列来实现

## 定时重复任务

- 方案一 一次性物理生成，重复50次就生成50条记录，永久重复则先重复生成一年数据，后续再通过定时任务生成
- 方案二 逻辑生成，重复任务只记录一条，记录重复次数和起止时间，每次展示任务列表时，通过数据库查询数据后，根据重复逻辑，生成任务数据。比如一条重复50次的任务，数据库只存放一条，前端取数据时通过代码逻辑生成具体的每日或每月任务返回。
