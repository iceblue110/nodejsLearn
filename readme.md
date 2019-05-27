nodejs learn


get /api/blog/list  author  keyword
get /api/blog/detail id
post /api/blog/new
post /api/blog/update id
post /api/blog/del  id
post /api/user/login

# blog项目

## 接口列表

* [获取博客列表](#获取博客列表)
* [获取博客详情](#获取博客详情)
* [新建一篇博客](#新建一篇博客)
* [更新一篇博客](#更新一篇博客)
* [删除一篇博客](#删除一篇博客)

## 获取博客列表

### [返回接口列表](#接口列表)

> Method: GET

> Path: {{IP:PORT}}/api/blog/list

> 说明

| 参数 | 类型 | 必选 | 说明 | 备注 |
| :--- | :--- | :--- |:---| :--- |
| ***请求参数->*** | - | - | - |
| source | int64 | false| 类型 | 0=默认,1=爆款,2=人工干预项目,3=流量扶持列表 |
| start | int64 | true | 查询开始时间戳 | 如：2100123456|
| end | int64 | true | 查询截止时间 | 如:201001234566 |
| next | string | false | 分页id | 如:默认空串或0|
| flowType | int64 | false | 流量扶持子类 | 0=全部，1=详情页回退,2=首页弹窗,3=个人中心弹窗,4=首页固定位,5=项目结束祝福流量位,6=支持成功纯净流量位| 
| fundStatus | int64 | false | 筹款状态| 0=全部,1=筹款中,2=筹款结束|
| displayMode | int64 | false | 是否开启大图模式 | 0=全部,1=未开启,2=已开启|
| supported | int64 | false | 是否扶持过 | 0=全部,1=未扶持,2=已扶持
| reported | int64 | false | 是否被举报过 | 0=全部,1=未被举报,2=被举报过
| conditionKey | int64 | false | 筛选条件 | 0=默认,1=发起人手机号,2=用户ID,3=项目ID，4=项目UUID |
| conditionValue | string | false | 项目筛选内容|(手机号，项目ID,用户ID,项目uuid)
| ***响应参数->*** | - | -| - | - |
| :--- | :--- | :--- |:---| :--- |
| source | int64 | true | 请求来源 | 0=保留值,1=潜在爆款,2=爆款项目 |
| id | int64 | int64 | id | 如：2100123456|
| projectID | int64 | true | 项目ID | 10101910 |
| projectUUID | string | true| 项目UUID | xx-xx-xxx-xx |
| publisherUserID | int64 | true | 项目发起人ID | 101001 |
| publisherPhone | string | true | 项目发起人手机 | 18612345678 |
| projectTitle | string | true| 项目标题 | 求大家帮帮我 |
| projectState | int64 | true | 项目状态 | 如:8192,512|
| projectStart | int64 | true | 项目开始时间 | 如：1554703928 |
| projectEnd | int64 | true | 项目截止时间 | 如：1554703928 |
| targetAmount | int64 | true | 目标金额(单位:分) | 如：1554703928|
| raisedAmount | int64 | true | 已筹金额(单位:分) | 如：1554703928 |
| supportNumber | int64 | true | 捐款次数 | 未对捐款人去重|  
| volunteerProject | bool | true | 志愿者项目 | true or false |
| crmProject | bool | true | 电销项目 | true or false |
| displayMode | int | true | 是否大图模式 | 1正常 2 大图 |
| isCommunicated | int| true | 是否沟通过| 1未沟通 2沟通过 |
| communicationRemark | string | true | 沟通备注内容 |  remark |
| proveCount | int64 | true| 证实数 | 如：0 |
| reportCount | int64 | true | 举报数 | 如：0|
| handlingReportCount | int64 | true | 已处理举报数 | 如:23 |
| created | int64 | true | 记录创建时间 | 如：1554703928 |
| updated | int64 | true | 记录更新时间 | 如：1554703928 |

>> RequestBody
```json
{
      "source": 1,
      "start": 12121212,
      "end": 1212121212,
      "next":"",
      "flowType":0,
      "fundStatus":0,
      "displayMode":0,
      "supported":0,
      "reported":0,
      "conditionKey":0,
      "conditionValue":"18612458888"
}
```

>> ResponseBody
```json
{
  "meta": {
    "code": "OK",
    "msg": "",
    "next": "0",
    "total": "0"
  },
  "data": [
    {
      "id": "9533",
      "projectID": 121212,
      "projectUUID": "xxx-xx-xx",
      "publisherUserID": 121212,
      "publisherPhone": "18611119889",
      "projectTitle": "测试标题",
      "projectState": 8192,
      "projectStart": 120102112,
      "projectEnd": 1200000000,
      "targetAmount": 10000000,
      "raisedAmount": 8000000,
      "supportNumber":0,
      "peopleNumber":0,
      "proveCount": 100,
      "reportCount": 20,
      "volunteerProject":true,
      "crmProject":true,
      "displayMode":1,
      "isCommunicated":1,
      "communicationRemark":"",
      "handlingReportCount": 5,
      "Created": 2100000000,
      "Updated": 2100001111
    }
  ]
}
```

