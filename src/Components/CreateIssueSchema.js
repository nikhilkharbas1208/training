export const jsonSchema ={
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "fields": {
      "type": "object",
      "properties": {
        "project": {
          "type": "object",
          "properties": {
            "key": {
              "type": "string",
            }
          },
          "required": ["key"]
        },
        "summary": {
          "type": "string",
        },
        "description": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "default": "doc"
            },
            "version": {
              "type": "integer",
              "default": 1
            },
            "content": {
              "type": "array",
              "items": [
                {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string",
                      "default": "paragraph"
                    },
                    "content": {
                      "type": "array",
                      "items": [
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "default": "text"
                            },
                            "text": {
                              "type": "string",
                              "default": "Default text content"
                            }
                          },
                          "required": ["type", "text"]
                        }
                      ]
                    }
                  },
                  "required": ["type", "content"]
                }
              ]
            }
          },
          "required": ["type", "version", "content"]
        },
        "issuetype": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "default": "Task"
            }
          },
          "required": ["name"]
        }
      },
      "required": ["project", "summary", "description", "issuetype"]
    },
   
  },
  "required": ["fields"]
}




export const uiJsonSchema = {
//   "ui:order": ["fields.project", "fields.issuetype", "fields.summary", "fields.description"],
  fields: {
    project: {
      key: {
        "ui:widget": "text",
        "ui:title": "Project Key",
        "ui:placeholder": "Enter project key"
      }
    },
    summary: {
      "ui:widget": "text",
      "ui:title": "Summary",
      "ui:placeholder": "Enter issue summary"
    },
    description: {
      type: {
        "ui:widget": "text",
        "ui:title": "Description",
        "ui:placeholder": "Enter issue description"
      },
      version: {
        "ui:widget": "hidden"
      },
      content: {
        "ui:widget": "hidden"
      }
    },
    issuetype: {
      name: {
        "ui:widget": "text",
        "ui:title": "Issue Type",
        "ui:placeholder": "Enter issuetype"
      }
    }
  }
};
