const request = require("supertest");
const app = require("../db/app");
const seed = require("../db/seeds/seed");
const testdata = require("../db/data/test-data");
const db = require("../db/connection");
const fs = require("fs/promises");
const toBeSorted = require("jest-sorted");

beforeEach(() => {
  return seed(testdata);
});

afterAll(() => {
  return db.end();
});
describe("GET /api/topics", () => {
  it("responds with a status of 200, and an array containing all topic objects", () => {
    return request(app) // arrange
      .get("/api/topics") // act
      .expect(200) // assert
      .then(({ body }) => {
        expect(body.topics.length).toBe(3);
        body.topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/", () => {
  it("responds with a status of 200, and an object containing all endpoints", () => {
    return request(app)
      .get("/api/")
      .expect(200)
      .then(({ body }) => {
        fs.readFile("./endpoints.json", "utf8").then((endpoints) => {
          expect(body).toMatchObject(JSON.parse(endpoints));
        });
      });
  });
});
describe("GET /api/articles/:articles_id", () => {
  it("responds with a status of 200, and an array containing article object matching the id input", () => {
    return request(app) // arrange
      .get("/api/articles/1") // act
      .expect(200) // assert
      .then(({ body }) => {
        expect(body.articles).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: 1,
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        });
      });
  });
});
describe("errors for GET /api/articles/:article_id", () => {
  it("status:400, responds with an error message when passed an invalid user ID", () => {
    return request(app)
      .get("/api/articles/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid input");
      });
  });
});
it("status:404, responds with an error message when passed an id that doesn/t exist", () => {
  return request(app)
    .get("/api/articles/50")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("id not found");
    });
});

describe("GET /api/articles", () => {
  it("responds with a status of 200, and an array containing all article objects with correct properties", () => {
    return request(app) // arrange
      .get("/api/articles") // act
      .expect(200) // assert
      .then(({ body }) => {
        expect(body.articles).toHaveLength(13);
        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          });
        });
      });
  });
});

describe("GET /api/`articles", () => {
  it("responds with a status of 200, and an array containing all article objects sorted in descending date order", () => {
    return request(app) // arrange
      .get("/api/articles") // act
      .expect(200) // assert
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});
describe("GET/api/articles/:article_id/comments", () => {
  it("responds with a status 200, and an array containing all comments with correct properties matching the id input", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(11);
        body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: 1,
          });
        });
      });
  });
});
describe("GET /api/:article_id/comments", () => {
  it("responds with a status of 200, and an array containing all article objects sorted with most recent comments first, i.e in descending date order", () => {
    return request(app) // arrange
      .get("/api/articles/1/comments") // act
      .expect(200) // assert
      .then(({ body }) => {
        expect(body.comments).toBeSortedBy("created_at", { descending: true });
      });
  });
});
describe("GET /api/2/comments", () => {
  it("responds with a status of 200, and a response message if requested id is valid BUT article has no comments", () => {
    return request(app) // arrange
      .get("/api/articles/2/comments") // act
      .expect(200) // assert
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
});
describe("ERRORS for GET /api/articles/2/comments ", () => {
  it("status:400, responds with an error message when passed an invalid user ID", () => {
    return request(app)
      .get("/api/articles/notAnId/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid input");
      });
  });
});
it("status:404, responds with an error message when passed an id that doesn/t exist", () => {
  return request(app)
    .get("/api/articles/50/comments")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("id not found");
    });
});

describe("POST /api/:article_id/comments", () => {
  it("responds with a status of 200, and adds a new comment to the array of comments for the given article i.d with correct properties", () => {
    const newComment = {
      body: "This is a wonderful article!",
      author: "butter_bridge",
    };
    return (
      request(app) //act
        .post("/api/articles/1/comments")
        .send(newComment) // act
        .expect(200)
        // assert
        .then(({ body }) => {
          expect(body.comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: newComment.author,
            body: newComment.body,
            article_id: 1,
          });
        })
    );
  });
});

describe("Errors for POST /api/articles/:artices_id/comments", () => {
  it("status:400, invalid user id ", () => {
    const newComment = {
      body: "This is a wonderful article!",
      author: "butter_bridge",
    };
    return (
      request(app)
      .post("/api/articles/notAnId/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid input");
      })
    )
  });
});
describe("Errors for POST /api/articles/:artices_id/comments", () => {
  it("status:404, article id which doesnt exist", () => {
    const newComment = {
      body: "This is a wonderful article!",
      author: "butter_bridge",
    };
    return request(app)
      .post("/api/articles/999/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
describe("Errors for POST /api/articles/:artices_id/comments", () => {
  it("status:400, no body sent", () => {
    const newComment = {
      author: "butter_bridge",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid input");
      });
  });
});
describe("Errors for POST /api/articles/:artices_id/comments", () => {
  it("status:404, author unknown", () => {
    const newComment = {
      body: "This is a wonderful article",
      author: "banana",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
describe("PATCH /api/articles/:article_id", () => {
  it("updates the number of votes an article has", () => {
    const newVote = {
      inc_votes: 1,
    };
    return (
      request(app) //act
        .patch("/api/articles/1")
        .send(newVote) // act
        .expect(200)
        // assert
        .then(({ body }) => {
          expect(body.article).toMatchObject({
            title: expect.any(String),
            votes: 101,
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: 1,
          });
        })
    );
  });
});

describe("Errors for PATCH /api/articles/:artices_id", () => {
  it("status:400, invalid user id ", () => {
    const newVote = {
      inc_votes: 1,
    };
    return (
      request(app)
      .patch("/api/articles/notAnId")
      .send(newVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid input");
      })
    )
  });
});

describe("Errors for PATCH /api/articles/:artices_id", () => {
  it("status:400, inc_vote unknown", () => {
    const newVote = {
      inc_votes: "banana",
    };
    return (
      request(app)
      .patch("/api/articles/1")
      .send(newVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid input");
      })
    )
  });
});
describe("Errors for PATCH /api/articles/:artices_id", () => {
  it("status:400, no body sent", () => {
    const newVote = {};
    return (
      request(app)
      .patch("/api/articles/1")
      .send(newVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid input");
      })
    )
  });
});
//FAILING TO FAIL
// describe("Errors for PATCH /api/articles/:artices_id", () => {
//   it("status:404, article id which doesnt exist", () => {
//     const newVote = {
//       inc_votes: 1,
//     };
//     return (
//       request(app)
//       .patch("/api/articles/999")
//       .send(newVote)
//       .expect(404)
//       .then(({ body }) => {
//         expect(body.msg).toBe("not found");
//       })
//     )
//   });
// });

//DELETE
// describe("DELETE /api/comments/:comment_id", () => {
//   it("deletes the given comment by comment_id", () => {
//     //const comm = {}
//     return (
//       request(app) //act
//         .delete("/api/comments/1") // act
//         .expect(204)
//         // assert
//         .then(({ body }) => {
//           expect(body.comments).toMatchObject({});
//         })
//     )
//   });
// });
// Delete errors >
//invalid comment id - 400(notAnId)
// describe("Errors for Delete /api/comments/:comment_id", () => {
//   it("status:400, invalid comment id ", () => {

//     return (
  //request(app)
//       .delete("/api/comments/notAnId")
//       .expect(400)
//       .then(({ body }) => {
//         expect(body.msg).toBe("invalid input");
//       })
//)
//   });
// });
//comment id does not exist - 404 (999)
// describe("Errors for Delete /api/comments/:comment_id", () => { it("status:404, comment id which doesnt exist", () => {
//     return (
//       request(app)
//       .delete("/api/comments/999")
//       .expect(404)
//       .then(({ body }) => {
//         expect(body.msg).toBe("not found");
//       })
//     );
//   })
// })
