<a name="top"></a>
# udaan v0.1.0

API docs for Udaan server.

# Table of contents

- [User](#User)
  - [User login](#User-login)
  - [User logout](#User-logout)
  - [User signup](#User-signup)
- [Kitchen](#Kitchen)
  - [Get all Kitchens](#Get-all-Kitchens)
  - [Get Kitchen by Id](#Get-Kitchen-by-Id)
  - [Insert Kitchen](#Insert-Kitchen)
- [ProductionLog](#ProductionLog)
  - [Get all prodution logs](#Get-all-prodution-logs)
  - [Insert production Log](#Insert-production-Log)
- [MonthlyLog](#MonthlyLog)
  - [Get all logs](#Get-all-logs)
  - [Insert log](#Insert-log)

___


# <a name='User'></a> User

## <a name='User-login'></a> User login
[Back to top](#top)

<p>Http-Only cookie is set.</p>

```
POST /api/v1/user/login
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| email | `string` |  |
| password | `string` |  |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201
 {
     "token": "abcd",
     "id": "eyshdhf",
     "name": "someName",
     "email": "email@gmail.com",
     "dateOfBirth": "2001-12-28"
 }
```

### Error response

#### Error response - `ClientError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `json` |  |

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='User-logout'></a> User logout
[Back to top](#top)

<p>Http-Only cookie is set.</p>

```
POST /api/v1/user/logout
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| JWT | `string` |  |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201
 {
     "message": "Logged Out!"
 }
```

### Error response

#### Error response - `ClientError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `json` |  |

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='User-signup'></a> User signup
[Back to top](#top)

```
POST /api/v1/user/signup
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `string` |  |
| kitchen | `string` | <p>kitchen's id</p> |
| email | `string` |  |
| password | `string` |  |
| dateOfBirth | `string` |  |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201
 {
     "message": "Created!"
 }
```

### Error response

#### Error response - `ClientError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `json` |  |

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

# <a name='Kitchen'></a> Kitchen

## <a name='Get-all-Kitchens'></a> Get all Kitchens
[Back to top](#top)

```
GET /api/v1/kitchen/all
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200
[
    {
        "id": "04740acb-cfa8-4edb-9433-78818eaa5d1c",
        "state": "someState",
        "city": "someCity",
        "area": "someArea",
        "pincode": 380006
    }
]
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Get-Kitchen-by-Id'></a> Get Kitchen by Id
[Back to top](#top)

```
GET /api/v1/kitchen/one/:id
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Insert-Kitchen'></a> Insert Kitchen
[Back to top](#top)

```
POST /api/v1/kitchen/
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `string` |  |
| state | `string` | <p>none</p> |
| city | `string` | <p>none</p> |
| area | `string` | <p>none</p> |
| pincode | `number` | <p>none</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201
 {
     "message": "Created!"
 }
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

# <a name='ProductionLog'></a> ProductionLog

## <a name='Get-all-prodution-logs'></a> Get all prodution logs
[Back to top](#top)

```
GET /api/v1/productionLog/all
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200
 [
     {
         "id": "04740acb-cfa8-4edb-9433-78818eaa5d1c",
         "entryDate": "2021-10-23T07:22:49.894Z",
         "quantityUsed": 3000,
         "quantityLeft": 555555,
         "platesMade": 300
     }
 ]
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Insert-production-Log'></a> Insert production Log
[Back to top](#top)

```
POST /api/v1/productionLog/
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| kitchen | `string` | <p>kitchen's id</p> |
| entryDate | `string` | **optional** <p>none</p> |
| platesMade | `number` | <p>none</p> |
| quantityUsed | `number` | <p>none</p> |
| quantityLeft | `number` | <p>none</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201
 {
     "message": "Created!"
 }
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

# <a name='MonthlyLog'></a> MonthlyLog

## <a name='Get-all-logs'></a> Get all logs
[Back to top](#top)

```
GET /api/v1/monthlyLog/all
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200
 [
     {
         "id": "04740acb-cfa8-4edb-9433-78818eaa5d1c",
         "entryDate": "2021-10-23T07:22:49.894Z",
         "materialName": "noneeee",
         "quantityBought": 555555,
         "quantityLeft": 300
     }
 ]
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Insert-log'></a> Insert log
[Back to top](#top)

```
POST /api/v1/monthlyLog/
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| kitchen | `string` | <p>kitchen's id</p> |
| entryDate | `string` | **optional** <p>none</p> |
| materialName | `string` | <p>none</p> |
| quantityBought | `number` | <p>none</p> |
| quantityLeft | `number` | <p>none</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201
 {
     "message": "Created!"
 }
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

