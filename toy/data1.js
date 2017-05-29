const data = require('./data_pb.js');
const BlockType = data.BlockType;
const Block = data.Block;
const Data = data.Data;

const BlockArray = new Data();
let block;

block = new Block();
block.setType(BlockType.OUTPUT);
block.setValue('2');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.TEXT);
block.setValue('你好');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.IF);
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.INPUT);
block.setValue('0');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.SYMBOL);
block.setValue('4');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.NUMBER);
block.setValue('30');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.START);
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.OUTPUT);
block.setValue('3');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.COLOR);
block.setValue('#ff0000');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.ELSE);
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.OUTPUT);
block.setValue('3');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.COLOR);
block.setValue('#33ff33');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.END);
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.FOR);
block.setValue('5');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.START);
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.IF);
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.INPUT);
block.setValue('1');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.SYMBOL);
block.setValue('4');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.NUMBER);
block.setValue('50');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.START);
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.OUTPUT);
block.setValue('0');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.NUMBER);
block.setValue('50');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.ELSE);
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.OUTPUT);
block.setValue('1');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.NUMBER);
block.setValue('90');
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.END);
BlockArray.addBlock(block);

block = new Block();
block.setType(BlockType.END);
BlockArray.addBlock(block);

const bytes = BlockArray.serializeBinary();

module.exports = {
    bytes
};
