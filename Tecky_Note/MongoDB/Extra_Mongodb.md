<!-- From https://www.runoob.com/nodejs/nodejs-mongodb.html -->

<!-- join tables -->
<!-- $lookup 實現left join -->

```ts
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    dbo.collection("orders")
        .aggregate([
            {
                $lookup: {
                    from: "products", // 右集合
                    localField: "product_id", // 左集合 join 字段
                    foreignField: "_id", // 右集合 join 字段
                    as: "orderdetails", // 新生成字段（類型array）
                },
            },
        ])
        .toArray(function (err, res) {
            if (err) throw err;
            console.log(JSON.stringify(res));
            db.close();
        });
});
```

<!-- 創建集合 create database -->

```ts
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/runoob";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    db.close();
});
```

<!-- 创建集合 create table-->

```ts
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/runoob";
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("数据库已创建");
    var dbase = db.db("runoob");
    dbase.createCollection("site", function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });
});
```

<!-- 插入一条数据 insert one-->

```ts
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var myobj = { name: "菜鸟教程", url: "www.runoob" };
    dbo.collection("site").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});
```

<!-- 插入多条数据 insert array-->

```ts
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var myobj = [
        { name: "菜鸟工具", url: "https://c.runoob.com", type: "cn" },
        { name: "Google", url: "https://www.google.com", type: "en" },
        { name: "Facebook", url: "https://www.google.com", type: "en" },
    ];
    dbo.collection("site").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });
});
```

<!-- find() -->

```ts
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    dbo.collection("site")
        .find({})
        .toArray(function (err, result) {
            // 返回集合中所有数据
            if (err) throw err;
            console.log(result);
            db.close();
        });
});
```

<!-- 查询指定条件的数据 -->

```ts
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var whereStr = { name: "菜鸟教程" }; // 查询条件
    dbo.collection("site")
        .find(whereStr)
        .toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
});
```


<!-- Demo data -->

```ts
const x = [
    {
        "Object_Array_key_00": "Object_Array_valus_00",
        "Object_Array_key_01": [
            {
                "Object_Array_key_10": "Object_Array_valus_11",
                "Object_Array_key_11": ["Object_Array_key_20", "Object_Array_key_21"],
            },
        ],
    },
    [
        "Array_Object_valus_01",
        {
            "Array_Object_key_11": "Array_Object_valus_11",
            "Array_Object_key_12": ["Array_Object_key_21", "Array_Object_key_22"],
        },
    ],
    ["Array_Array_valus_01", ["Array_Array_valus_11", ["Array_Array_valus_12"]]],
];
```
