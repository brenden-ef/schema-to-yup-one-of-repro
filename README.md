# How to reproduce
1. `npm ci` 
2. `npm start`


The schema should be invalid, as shown in this validator:  https://www.jsonschemavalidator.net/
**Schema**
```json
{
  "title": "Schema title",
  "description": "Schema description",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
    },
    "lastName": {
      "type": "string",
    },
    "requireAddress": {
      "type": "string",
      "enum": [
        "yes",
        "no"
      ]
    },
    "addressLine1": {
      "type": "string",
    },
    "addressLine2": {
      "type": "string",
    }
  },
  "required": [
    "firstName",
    "lastName",
    "requireAddress"
  ],
  "oneOf": [
    {
      "properties": {
        "requireAddress": {
          "const": "yes"
        },
        "addressLine1": {
          "minLength": 2
        },
        "addressLine2": {
          "minLength": 2
        }
      },
      "required": [
        "addressLine1",
        "addressLine2"
      ]
    },
    {
      "properties": {
        "requireAddress": {
          "const": "no"
        }
      }
    }
  ]
}
```

**Object that should be invalid**
```json
{
  "firstName": "han",
  "lastName": "yolo",
  "requireAddress": "yes",
  "addressLine2": "houseNumber"
}
```