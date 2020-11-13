"use strict";

var mongoose = require("mongoose");

var db = require("../config/db");

var ProductKind = db.ProductKind;
module.exports = {
  getAll: getAll,
  create: create,
  remove: remove,
  getById: getById,
  edit: edit,
  getByName: getByName
};

function getAll() {
  return regeneratorRuntime.async(function getAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ProductKind.find());

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
} //-------------------------------------------------------------------------------


function getById(id) {
  return regeneratorRuntime.async(function getById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(ProductKind.find({
            _id: id
          }));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getByName(name) {
  return regeneratorRuntime.async(function getByName$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(ProductKind.find({
            title: name
          }));

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
} //-------------------------------------------------------------------------------


function create(body, filepath, userId) {
  var modifiedLog, solutionKind;
  return regeneratorRuntime.async(function create$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          modifiedLog = {
            date: new Date(),
            userId: userId
          };
          solutionKind = new ProductKind({
            logo: filepath,
            title: body.title,
            tags: body.tags,
            description: body.description,
            modifiedLog: modifiedLog
          });
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(solutionKind.save());

        case 5:
          return _context4.abrupt("return", solutionKind);

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](2);
          console.log(_context4.t0);
          return _context4.abrupt("return", _context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 8]]);
} //-------------------------------------------------------------------------------


function remove(id) {
  var result;
  return regeneratorRuntime.async(function remove$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(ProductKind.findOneAndRemove({
            _id: id
          }));

        case 3:
          result = _context5.sent;

          if (result) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", {
            Error: "Record not found"
          });

        case 6:
          return _context5.abrupt("return", {
            result: result,
            Message: "Record is deleted"
          });

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", {
            "errorr is :": _context5.t0
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
} //-------------------------------------------------------------------------------


function edit(body, capabilityKindId, userId) {
  var modifiedLog, result;
  return regeneratorRuntime.async(function edit$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          modifiedLog = {
            date: new Date(),
            userId: userId
          };
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(ProductKind.findOneAndUpdate({
            _id: capabilityKindId
          }, {
            $set: {
              "logo": body.logo,
              "title": body.title,
              "tags": body.tags,
              "description": body.description
            },
            $addToSet: {
              modifiedLog: modifiedLog
            }
          }));

        case 4:
          result = _context6.sent;

          if (result) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", {
            Error: "Record not found"
          });

        case 7:
          return _context6.abrupt("return", {
            result: result,
            Message: "Record is updated"
          });

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](1);
          return _context6.abrupt("return", {
            "errorr is :": _context6.t0
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 10]]);
} //-------------------------------------------------------------------------------