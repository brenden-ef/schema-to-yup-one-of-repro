import { buildYup } from "schema-to-yup";

const schema = {
  title: "Schema title",
  description: "Schema description",
  type: "object",
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    requireAddress: {
      type: "string",
      enum: ["yes", "no"],
    },
    addressLine1: {
      type: "string",
    },
    addressLine2: {
      type: "string",
    },
  },
  required: ["firstName", "lastName", "requireAddress"],
  oneOf: [
    {
      properties: {
        requireAddress: {
          const: "yes",
        },
        addressLine1: {
          minLength: 2,
        },
        addressLine2: {
          minLength: 2,
        },
      },
      required: ["addressLine1", "addressLine2"],
    },
    {
      properties: {
        requireAddress: {
          const: "no",
        },
      },
    },
  ],
};

const yupSchema = buildYup(schema, {}, undefined);

const testObj = {
  firstName: "han",
  lastName: "yolo",
  requireAddress: "yes",
  addressLine2: "houseNumber",
};

const isValid = yupSchema.isValidSync(testObj);

// given that requireAddress is true and addressLine1 is missing, this should be false
console.log("is valid: ", isValid);
