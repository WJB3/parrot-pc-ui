# IDO接口文档

## 岗位系统防护配备

### 获取岗位列表

- 地址：http://ido.saas.com/pm/jobs/getlist?page=1&limit=20&sort=id&order=desc

- 方式：get

- 请求参数：

  | 字段  | 说明                          | 必要性 |
  | ----- | ----------------------------- | ------ |
  | page  | 页数                          | false  |
  | limit | 条数                          | false  |
  | sort  | 排序字段                      | false  |
  | order | 排序方式：desc-倒叙，asc-正序 | false  |

- 响应数据

  > {
  >
  >   "current_page": 1,
  >
  >   "data": [
  >
  > ​    {
  >
  > ​      "id": 440,——岗位ID
  >
  > ​      "name": "总经理",——岗位名称
  >
  > ​      "parent_id": **null**,——上级岗位ID
  >
  > ​      "parent_name": **null**,——上级岗位名称
  >
  > ​      "dep_id": "381",——部门ID
  >
  > ​      "dep_name": "总经办",——部门名称
  >
  > ​      "description": " 表述"——描述
  >
  > ​    }
  >
  > ],
  >
  > "first_page_url": "http://ido.saas.com/pm/jobs/getlist?page=1",
  >
  >   "from": 1,
  >
  >   "last_page": 1,
  >
  >   "last_page_url": "http://ido.saas.com/pm/jobs/getlist?page=1",
  >
  >   "next_page_url": **null**,
  >
  >   "path": "http://ido.saas.com/pm/jobs/getlist",
  >
  >   "per_page": "20",
  >
  >   "prev_page_url": **null**,
  >
  >   "to": 1,
  >
  >   "total": 1
  >
  >   }

### 获取防护初始数据

​		获取品牌、认证、标准、防护用途、部位

- 地址：http://ido.saas.com/safeguard/getreslist

- 方式：get

- 参数：无

- 响应数据：

  > {
  >
  >   "result": 0,
  >
  >   "data": {
  >
  > ​    "brand_list": [
  >
  > ​      {
  >
  > ​        "id": 290, ——品牌ID
  >
  > ​        "name": "3M",——品牌名称
  >
  > ​      },
  >
  >    ......................
  >
  > ​    ],
  >
  > ​    "standard_list": [
  >
  > ​      {
  >
  > ​        "id": 1,——标准ID
  >
  > ​        "name": "gc646-546",——标准名称
  >
  > ​        "system": " GH496496",——标准体系
  >
  > ​        "describe": "国家标准"——标准描述
  >
  > ​      },
  >
  > ​     ....................
  >
  > ​    ],
  >
  > ​    "approve_list": [
  >
  > ​      {
  >
  > ​        "id": 1,——认证信息ID
  >
  > ​        "name": "1",——认证信息名称
  >
  > ​        "system": "1",——认证信息体系
  >
  > ​        "describe": "1"——认证信息描述
  >
  > ​      },
  >
  > ​      ....................
  >
  > ​    ],
  >
  > ​    "purpose_list": [
  >
  > ​      {
  >
  > ​        "id": 1,——防护用途ID
  >
  > ​        "name": "1",——防护用途名称
  >
  > ​        "explain": "1",——防护用途说明
  >
  > ​        "remark": "1"——防护用途备注
  >
  > ​      },
  >
  > ​      ..................
  >
  > ​	"part_list": [
  >
  > ​      {
  >
  > ​        "id": 1,——防护部位ID
  >
  > ​        "name": "手部"——防护部位名称
  >
  > ​      },
  >
  > ​      ..........
  >
  > ​    ]
  >
  > ​    ]
  >
  >   }
  >
  > }



### 获取选型（购物车）数据

- 地址：http://ido.saas.com/safeguard/getcart

- 方式：get

- 参数：无

- 响应数据：

  > {
  >
  >   "result": 0,
  >
  >   "data": [
  >
  >    {
  >
  > ​      "shop_price": "50.00", ——单价
  >
  > ​      "store_count": 5000,——库存
  >
  > ​      "sku": "0001000096",——商品编号
  >
  > ​      "key_name": "镜架:黑色 包装:一盒10付",
  >
  > ​      "goods_name": "霍尼韦尔 110110 S600A 流线型护目镜防尘防风防雾防护眼镜镜架:黑色 包装:一盒10付", ——产品名称你
  >
  > ​      "brand_name": "霍尼韦尔",——品牌名称
  >
  > ​      "goods_sn": "110110",——规格型号
  >
  > ​      "original_img": "/public/upload/goods/2019/08-02/b38b9e555c81426a7963260d82624c84.png",——产品图片
  >
  > ​      "brand_id": 291——品牌ID
  >
  > ​    },
  >
  > ​    .....................
  >
  >   ]



### 获取选型结果

- 地址：http://ido.saas.com/safeguard/getproductres

- 方式：POST

- 参数：

  | 字段         | 说明       | 必要性 |
  | ------------ | ---------- | ------ |
  | job_id       | 岗位ID     | true   |
  | part_id      | 防护部位ID | false  |
  | level        | 等级       | false  |
  | service_life | 使用期限   | false  |
  | standard     | 标准信息ID | false  |
  | approve_id   | 认证信息ID | false  |
  | part_id      | 防护部位ID | false  |

- 响应数据：

  > {
  >
  >   "result": 0,
  >
  >   "data": [
  >
  >    {
  >
  > ​      "shop_price": "50.00", ——单价
  >
  > ​      "store_count": 5000,——库存
  >
  > ​      "sku": "0001000096",——商品编号
  >
  > ​      "key_name": "镜架:黑色 包装:一盒10付",
  >
  > ​      "goods_name": "霍尼韦尔 110110 S600A 流线型护目镜防尘防风防雾防护眼镜镜架:黑色 包装:一盒10付", ——产品名称你
  >
  > ​      "brand_name": "霍尼韦尔",——品牌名称
  >
  > ​      "goods_sn": "110110",——规格型号
  >
  > ​      "original_img": "/public/upload/goods/2019/08-02/b38b9e555c81426a7963260d82624c84.png",——产品图片
  >
  > ​      "brand_id": 291——品牌ID
  >
  > ​    },
  >
  > ​    .....................
  >
  >   ]



## 岗位职责

### 添加岗位

- 地址：http://ido.saas.com/pm/jobs/add

- 方式：post

- 请求参数：

  | 字段名        | 说明             | 必要性 |
  | ------------- | ---------------- | ------ |
  | name          | 岗位名称         | true   |
  | dep_id        | 部门ID           | true   |
  | parent_id     | 上级岗位ID       | false  |
  | description   | 岗位描述         | false  |
  | job_factors[] | 岗位风险因素列表 | false  |
  | jobs_harm[]   | 岗位风险危害列表 | false  |
  | jobs_scene[]  | 岗位风险场景列表 | false  |

  列表解释：

  | job_factors[] | 岗位风险因素列表 |       |
  | ------------- | ---------------- | ----- |
  | factors_id    | 风险因素ID       | false |

  | jobs_harm[] | 岗位风险危害列表 |       |
  | ----------- | ---------------- | ----- |
  | harm_id     | 风险危害ID       | false |

  | jobs_scene[] | 岗位风险场景列表 |       |
  | ------------ | ---------------- | ----- |
  | scene_id     | 风险场景ID       | false |

  

- 响应数据：

  > {
  >
  >   "name": "销售员", 
  >
  >   "quality_id": **null**,
  >
  >   "description": "表述",
  >
  >   "dep_id": "381",
  >
  >   "parent_id": **null**,
  >
  >   "job_left": 5,
  >
  >   "job_right": 6,
  >
  >   "update_by": 378,
  >
  >   "updated_at": "2020-12-18 13:29:47",
  >
  >   "created_at": "2020-12-18 13:29:47",
  >
  >   "id": 448,
  >
  >   "dep_name": "总经办"
  >
  > }





