/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.Block', null, global);
goog.exportSymbol('proto.BlockType', null, global);
goog.exportSymbol('proto.Data', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Block = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Block, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Block.displayName = 'proto.Block';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Block.prototype.toObject = function(opt_includeInstance) {
  return proto.Block.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Block} msg The msg instance to transform.
 * @return {!Object}
 */
proto.Block.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getField(msg, 1),
    value: jspb.Message.getField(msg, 2)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Block}
 */
proto.Block.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Block;
  return proto.Block.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Block} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Block}
 */
proto.Block.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.BlockType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Block.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Block.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Block} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.Block.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!proto.BlockType} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * required BlockType type = 1;
 * @return {!proto.BlockType}
 */
proto.Block.prototype.getType = function() {
  return /** @type {!proto.BlockType} */ (jspb.Message.getFieldWithDefault(this, 1, 1));
};


/** @param {!proto.BlockType} value */
proto.Block.prototype.setType = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.Block.prototype.clearType = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Block.prototype.hasType = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string value = 2;
 * @return {string}
 */
proto.Block.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.Block.prototype.setValue = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.Block.prototype.clearValue = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Block.prototype.hasValue = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Data = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Data.repeatedFields_, null);
};
goog.inherits(proto.Data, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Data.displayName = 'proto.Data';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Data.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Data.prototype.toObject = function(opt_includeInstance) {
  return proto.Data.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Data} msg The msg instance to transform.
 * @return {!Object}
 */
proto.Data.toObject = function(includeInstance, msg) {
  var f, obj = {
    blockList: jspb.Message.toObjectList(msg.getBlockList(),
    proto.Block.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Data}
 */
proto.Data.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Data;
  return proto.Data.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Data} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Data}
 */
proto.Data.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Block;
      reader.readMessage(value,proto.Block.deserializeBinaryFromReader);
      msg.addBlock(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Data.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Data.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Data} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.Data.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBlockList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.Block.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Block block = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.Block>}
 */
proto.Data.prototype.getBlockList = function() {
  return /** @type{!Array.<!proto.Block>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Block, 1));
};


/** @param {!Array.<!proto.Block>} value */
proto.Data.prototype.setBlockList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Block=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Block}
 */
proto.Data.prototype.addBlock = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Block, opt_index);
};


proto.Data.prototype.clearBlockList = function() {
  this.setBlockList([]);
};


/**
 * @enum {number}
 */
proto.BlockType = {
  START: 1,
  END: 2,
  INPUT: 3,
  OUTPUT: 4,
  NUMBER: 5,
  WHILE: 6,
  FOR: 7,
  IF: 8,
  ELSE: 9,
  SYMBOL: 10,
  TEXT: 11,
  COLOR: 12
};

goog.object.extend(exports, proto);
