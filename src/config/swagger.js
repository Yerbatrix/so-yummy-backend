const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "So Yummy API",
      version: "1.0.0",
      description: "API documentation for the So Yummy project",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Recipe: {
          type: "object",
          required: [
            "title",
            "category",
            "area",
            "instructions",
            "description",
            "thumb",
            "preview",
            "time",
          ],
          properties: {
            _id: {
              type: "string",
              description: "The auto-generated id of the recipe",
            },
            title: {
              type: "string",
              description: "Title of the recipe",
            },
            category: {
              type: "string",
              description: "Category of the recipe",
            },
            area: {
              type: "string",
              description: "Area of the recipe",
            },
            instructions: {
              type: "string",
              description: "Instructions for the recipe",
            },
            description: {
              type: "string",
              description: "Description of the recipe",
            },
            thumb: {
              type: "string",
              description: "Thumbnail image URL of the recipe",
            },
            preview: {
              type: "string",
              description: "Preview image URL of the recipe",
            },
            time: {
              type: "string",
              description: "Time required to prepare the recipe",
            },
            ingredients: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    description: "ID of the ingredient",
                  },
                  measure: {
                    type: "string",
                    description: "Measure of the ingredient",
                  },
                },
              },
              description: "List of ingredients",
            },
            favorites: {
              type: "array",
              items: {
                type: "string",
              },
              description: "List of users who favorited the recipe",
            },
            youtube: {
              type: "string",
              description: "YouTube link for the recipe",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Tags for the recipe",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Date when the recipe was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Date when the recipe was last updated",
            },
          },
        },
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            _id: {
              type: "string",
              description: "The auto-generated id of the user",
            },
            name: {
              type: "string",
              description: "Name of the user",
            },
            email: {
              type: "string",
              description: "Email of the user",
            },
            password: {
              type: "string",
              description: "Password of the user",
            },
            daysInApp: {
              type: "number",
              description: "Number of days the user has been in the app",
            },
            recipesAdded: {
              type: "number",
              description: "Number of recipes added by the user",
            },
            favoriteRecipesCount: {
              type: "number",
              description: "Number of favorite recipes of the user",
            },
            jwtToken: {
              type: "string",
              description: "JWT token of the user",
            },
            avatar: {
              type: "string",
              description: "Avatar URL of the user",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUI, swaggerDocs };
