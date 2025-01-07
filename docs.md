# API Documentation

## Public Routes (No Authentication Required)

### User Authentication

#### Login User

- **Route**: `POST /api/users/login`
- **Body**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **Response**:

```json
{
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com",
    "type": "Soldier"
  },
  "token": "jwt_token",
  "type": "user"
}
```

#### Register User

- **Route**: `POST /api/users/register`
- **Body**:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "passport": "AB123456",
  "email": "user@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "type": "Soldier"
}
```

- **Response**:

```json
{
  "message": "User created successfully",
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com",
    "type": "Soldier"
  }
}
```

#### Create Signup Request

- **Route**: `POST /api/signup-requests`
- **Body**:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "passport": "AB123456",
  "email": "user@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "type": "Soldier"
}
```

- **Response**:

```json
{
  "message": "Signup request submitted successfully",
  "token": "jwt_token",
  "request": {
    "_id": "request_id",
    "status": "pending",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

## Protected Routes (Authentication Required)

All protected routes require an Authorization header:

```
Authorization: Bearer jwt_token
```

### Admin Only Routes

#### Get All Users

- **Route**: `GET /api/users`
- **Response**:

```json
[
  {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com",
    "type": "Soldier"
  }
]
```

#### Get All Signup Requests

- **Route**: `GET /api/signup-requests`
- **Response**:

```json
[
  {
    "_id": "request_id",
    "firstName": "John",
    "lastName": "Doe",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Signup Request by ID

- **Route**: `GET /api/signup-requests/:id`
- **Response**:

```json
{
  "_id": "request_id",
  "firstName": "John",
  "lastName": "Doe",
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Update Signup Request Status

- **Route**: `PUT /api/signup-requests/:id/status`
- **Body**:

```json
{
  "progress": "completed",
  "approved": "approved",
  "reason": "Optional reason for denial"
}
```

- **Response**:

```json
{
  "_id": "request_id",
  "status": "approved",
  "progress": "completed",
  "approvedBy": "admin_id"
}
```

### Soldier Only Routes

#### Subscribe/Unsubscribe to EatUp

- **Route**: `POST /api/eatups/:id/subscribe`
- **Response**:

```json
{
  "message": "Subscribed successfully",
  "eatup": {
    "_id": "eatup_id",
    "guests": ["user_id"]
  },
  "channel": {
    "_id": "channel_id",
    "members": ["user_id"]
  }
}
```

#### Create Request

- **Route**: `POST /api/requests`
- **Body**:

```json
{
  "title": "Request Title",
  "description": "Request Description",
  "type": "assistance"
}
```

- **Response**:

```json
{
  "message": "Request created successfully",
  "data": {
    "_id": "request_id",
    "title": "Request Title",
    "status": "pending"
  }
}
```

### Municipality Only Routes

#### Update Request Status

- **Route**: `PUT /api/requests/:id/status`
- **Body**:

```json
{
  "status": "approved"
}
```

- **Response**:

```json
{
  "_id": "request_id",
  "status": "approved",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Donor Only Routes

#### Create Donation

- **Route**: `POST /api/donation`
- **Body**:

```json
{
  "amount": 100,
  "description": "Donation Description",
  "type": "monetary"
}
```

- **Response**:

```json
{
  "message": "Donation created successfully",
  "donation": {
    "_id": "donation_id",
    "amount": 100,
    "type": "monetary"
  }
}
```

#### Get Approved Requests

- **Route**: `GET /api/requests/approved`
- **Response**:

```json
[
  {
    "_id": "request_id",
    "title": "Request Title",
    "status": "approved"
  }
]
```

### Municipality, Donor, or Organization Routes

#### Create EatUp

- **Route**: `POST /api/eatups`
- **Body**:

```json
{
  "title": "EatUp Title",
  "description": "EatUp Description",
  "date": "2024-01-01T00:00:00.000Z",
  "location": "Location"
}
```

- **Response**:

```json
{
  "data": {
    "eatup": {
      "_id": "eatup_id",
      "title": "EatUp Title",
      "owner": "user_id"
    },
    "channel": {
      "_id": "channel_id",
      "members": ["user_id"]
    }
  }
}
```

### Municipality or Donor Routes

#### Get All Requests

- **Route**: `GET /api/requests`
- **Response**:

```json
[
  {
    "_id": "request_id",
    "title": "Request Title",
    "status": "pending",
    "user": {
      "firstName": "John",
      "lastName": "Doe"
    }
  }
]
```

### Any Authenticated User Routes

#### Profile Routes

- **Get Profile**
  - **Route**: `GET /api/profile/:id`
  - **Response**:

```json
{
  "_id": "user_id",
  "firstName": "John",
  "lastName": "Doe",
  "nickname": "JD",
  "bio": "User bio"
}
```

- **Update Profile**
  - **Route**: `PUT /api/profile/:id`
  - **Body**:

```json
{
  "nickname": "JD",
  "bio": "Updated bio",
  "profileImage": "image_url"
}
```

- **Response**:

```json
{
  "_id": "user_id",
  "nickname": "JD",
  "bio": "Updated bio",
  "profileImage": "image_url"
}
```

#### User Routes

- **Get Current User**
  - **Route**: `GET /api/users/me`
  - **Response**:

```json
{
  "_id": "user_id",
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com"
}
```

- **Get User by ID**
  - **Route**: `GET /api/users/:id`
  - **Response**:

```json
{
  "_id": "user_id",
  "firstName": "John",
  "lastName": "Doe"
}
```

- **Update User**
  - **Route**: `PUT /api/users/:id`
  - **Body**:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

- **Response**:

```json
{
  "_id": "user_id",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

- **Delete User**
  - **Route**: `DELETE /api/users/:id`
  - **Response**:

```json
{
  "message": "User deleted successfully"
}
```

#### EatUp Routes

- **Get All EatUps**
  - **Route**: `GET /api/eatups`
  - **Response**:

```json
[
  {
    "_id": "eatup_id",
    "title": "EatUp Title",
    "owner": {
      "firstName": "John",
      "lastName": "Doe"
    }
  }
]
```

- **Get EatUp by ID**
  - **Route**: `GET /api/eatups/:id`
  - **Response**:

```json
{
  "_id": "eatup_id",
  "title": "EatUp Title",
  "description": "Description",
  "owner": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

- **Update EatUp**
  - **Route**: `PUT /api/eatups/:id`
  - **Body**:

```json
{
  "title": "Updated Title",
  "description": "Updated Description"
}
```

- **Response**:

```json
{
  "_id": "eatup_id",
  "title": "Updated Title",
  "description": "Updated Description"
}
```

- **Delete EatUp**
  - **Route**: `DELETE /api/eatups/:id`
  - **Response**:

```json
{
  "message": "EatUp deleted successfully"
}
```

#### Donation Routes

- **Get All Donations**
  - **Route**: `GET /api/donation`
  - **Response**:

```json
[
  {
    "_id": "donation_id",
    "amount": 100,
    "authorId": {
      "firstName": "John",
      "lastName": "Doe"
    }
  }
]
```

- **Get Donation by ID**
  - **Route**: `GET /api/donation/:id`
  - **Response**:

```json
{
  "_id": "donation_id",
  "amount": 100,
  "description": "Donation Description"
}
```

- **Update Donation**
  - **Route**: `PUT /api/donation/:id`
  - **Body**:

```json
{
  "amount": 150,
  "description": "Updated Description"
}
```

- **Response**:

```json
{
  "message": "Donation updated successfully",
  "donation": {
    "_id": "donation_id",
    "amount": 150
  }
}
```

- **Delete Donation**
  - **Route**: `DELETE /api/donation/:id`
  - **Response**:

```json
{
  "message": "Donation deleted successfully"
}
```

#### Residence Routes

- **Get All Residences**
  - **Route**: `GET /api/residences`
  - **Response**:

```json
[
  {
    "_id": "residence_id",
    "location": "Address",
    "price": 1000,
    "authorId": {
      "firstName": "John",
      "lastName": "Doe"
    }
  }
]
```

- **Get Residence by ID**
  - **Route**: `GET /api/residences/:id`
  - **Response**:

```json
{
  "_id": "residence_id",
  "location": "Address",
  "price": 1000,
  "rooms": 3
}
```

- **Create Residence**
  - **Route**: `POST /api/residences`
  - **Body**:

```json
{
  "enterDate": "2024-01-01",
  "location": "Address",
  "meter": 100,
  "rooms": 3,
  "zone": "North",
  "price": 1000,
  "floor": 2,
  "type": "apartment",
  "owner": "Owner Name",
  "phone": "+1234567890",
  "propertyTax": 100,
  "shalter": true,
  "storage": true,
  "balcony": true,
  "contractDuration": 12
}
```

- **Response**:

```json
{
  "_id": "residence_id",
  "location": "Address",
  "price": 1000,
  "authorId": "user_id"
}
```

- **Update Residence**
  - **Route**: `PUT /api/residences/:id`
  - **Body**:

```json
{
  "price": 1200,
  "propertyTax": 120
}
```

- **Response**:

```json
{
  "_id": "residence_id",
  "price": 1200,
  "propertyTax": 120
}
```

- **Delete Residence**
  - **Route**: `DELETE /api/residences/:id`
  - **Response**:

```json
{
  "message": "Residence deleted successfully"
}
```

#### Request Routes

- **Get User's Requests**
  - **Route**: `GET /api/requests/my-requests`
  - **Response**:

```json
[
  {
    "_id": "request_id",
    "title": "Request Title",
    "status": "pending"
  }
]
```

- **Get Request by ID**
  - **Route**: `GET /api/requests/:id`
  - **Response**:

```json
{
  "_id": "request_id",
  "title": "Request Title",
  "description": "Description",
  "status": "pending"
}
```

- **Update Request**
  - **Route**: `PUT /api/requests/:id`
  - **Body**:

```json
{
  "title": "Updated Title",
  "description": "Updated Description"
}
```

- **Response**:

```json
{
  "_id": "request_id",
  "title": "Updated Title",
  "description": "Updated Description"
}
```

- **Delete Request**
  - **Route**: `DELETE /api/requests/:id`
  - **Response**:

```json
{
  "message": "Request deleted successfully"
}
```

#### Channel Routes

- **Get User's Channels**
  - **Route**: `GET /api/channels`
  - **Response**:

```json
[
  {
    "_id": "channel_id",
    "type": "eatup",
    "members": ["user_id"]
  }
]
```

- **Create Channel**
  - **Route**: `POST /api/channels`
  - **Body**:

```json
{
  "name": "Channel Name",
  "members": ["user_id"],
  "isPublic": true
}
```

- **Response**:

```json
{
  "_id": "channel_id",
  "name": "Channel Name",
  "members": ["user_id"]
}
```

- **Delete Channel**

  - **Route**: `DELETE /api/channels/:id`
  - **Response**: `204 No Content`

- **Close Channel**

  - **Route**: `PUT /api/channels/:id/close`
  - **Response**: `204 No Content`

- **Add Members**
  - **Route**: `PUT /api/channels/:id/members`
  - **Body**:

```json
{
  "members": ["user_id1", "user_id2"]
}
```

- **Response**:

```json
{
  "_id": "channel_id",
  "members": ["user_id1", "user_id2"]
}
```

- **Add Single Member**
  - **Route**: `PUT /api/channels/:id/members/:userId`
  - **Response**: `204 No Content`

#### Message Routes

- **Create Message**
  - **Route**: `POST /api/messages`
  - **Body**:

```json
{
  "channelId": "channel_id",
  "content": "Message content"
}
```

- **Response**:

```json
{
  "_id": "message_id",
  "content": "Message content",
  "sender": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

- **Get Channel Messages**
  - **Route**: `GET /api/messages/channel/:channelId`
  - **Response**:

```json
[
  {
    "_id": "message_id",
    "content": "Message content",
    "sender": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

- **Update Message**
  - **Route**: `PUT /api/messages/:id`
  - **Body**:

```json
{
  "content": "Updated content"
}
```

- **Response**:

```json
{
  "_id": "message_id",
  "content": "Updated content",
  "isEdited": true
}
```

- **Delete Message**
  - **Route**: `DELETE /api/messages/:id`
  - **Response**:

```json
{
  "message": "Message deleted successfully"
}
```

## Special Notes:

1. Admin users have access to all routes
2. Owner-only operations (update/delete) can also be performed by admins
3. Channel operations require the user to be a member of the channel
4. Message operations require the user to be a member of the associated channel
