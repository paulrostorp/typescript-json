import TSON from "../../../src";
import { ObjectAlias } from "../../structures/ObjectAlias";
import { _test_application } from "./_test_application";

export const test_application_object_alias = _test_application(
    "aliased object",
    TSON.application<[ObjectAlias]>(),
    {
        schemas: [
            {
                type: "array",
                items: {
                    $ref: "#/components/schemas/ObjectAlias.IMember",
                },
                nullable: false,
            },
        ],
        components: {
            schemas: {
                "ObjectAlias.IMember": {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            nullable: true,
                        },
                        email: {
                            type: "string",
                            nullable: false,
                        },
                        name: {
                            type: "string",
                            nullable: false,
                        },
                        sex: {
                            oneOf: [
                                {
                                    type: "number",
                                    enum: [2, 1],
                                    nullable: true,
                                },
                                {
                                    type: "string",
                                    enum: ["male", "female"],
                                    nullable: true,
                                },
                            ],
                        },
                        age: {
                            type: "number",
                            nullable: true,
                        },
                        dead: {
                            type: "boolean",
                            nullable: true,
                        },
                    },
                    nullable: false,
                    required: ["id", "email", "name", "sex", "age", "dead"],
                    jsDocTags: [],
                },
            },
        },
        purpose: "swagger",
        prefix: "#/components/schemas",
    },
);
