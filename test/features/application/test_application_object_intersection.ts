import TSON from "../../../src";
import { ObjectIntersection } from "../../structures/ObjectIntersection";
import { _test_application } from "./_test_application";

export const test_application_object_intersection = _test_application(
    "intersected object",
    TSON.application<[ObjectIntersection]>(),
    {
        schemas: [
            {
                $ref: "#/components/schemas/ObjectIntersection",
            },
        ],
        components: {
            schemas: {
                ObjectIntersection: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            nullable: false,
                        },
                        name: {
                            type: "string",
                            nullable: false,
                        },
                        vulnerable: {
                            type: "boolean",
                            nullable: false,
                        },
                    },
                    nullable: false,
                    required: ["email", "name", "vulnerable"],
                    jsDocTags: [],
                },
            },
        },
        purpose: "swagger",
        prefix: "#/components/schemas",
    },
);
