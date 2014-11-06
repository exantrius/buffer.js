/* exports Buffer */

function Buffer() {}

function checkOffset(offset, ext, length) {
    if (offset < 0 || offset + ext > length) {
        throw new RangeError('index out of range');
    }
}

Buffer.readUInt8 = function(buffer, offset, noAssert) {
    offset = ~~offset;
    if (!noAssert) {
        checkOffset(offset, 1, buffer.length);
    }
    return buffer[offset];
};

function readUInt16(buffer, offset, isBigEndian) {
    var val = 0;
    if (isBigEndian) {
        val = buffer[offset] << 8;
        val |= buffer[offset + 1];
    } else {
        val = buffer[offset];
        val |= buffer[offset + 1] << 8;
    }
    return val;
}

Buffer.readUInt16LE = function(buffer, offset, noAssert) {
    offset = ~~offset;
    if (!noAssert) {
        checkOffset(offset, 2, buffer.length);
    }
    return readUInt16(buffer, offset, false);
};


Buffer.readUInt16BE = function(buffer, offset, noAssert) {
    offset = ~~offset;
    if (!noAssert) {
        checkOffset(offset, 2, buffer.length);
    }
    return readUInt16(buffer, offset, true);
};


function readUInt32(buffer, offset, isBigEndian) {
    var val = 0;
    if (isBigEndian) {
        val = buffer[offset + 1] << 16;
        val |= buffer[offset + 2] << 8;
        val |= buffer[offset + 3];
        val = val + (buffer[offset] << 24 >>> 0);
    } else {
        val = buffer[offset + 2] << 16;
        val |= buffer[offset + 1] << 8;
        val |= buffer[offset];
        val = val + (buffer[offset + 3] << 24 >>> 0);
    }
    return val;
}

Buffer.readUInt32LE = function(buffer, offset, noAssert) {
    offset = ~~offset;
    if (!noAssert) {
        checkOffset(offset, 4, buffer.length);
    }
    return readUInt32(buffer, offset, false);
};


Buffer.readUInt32BE = function(buffer, offset, noAssert) {
    offset = ~~offset;
    if (!noAssert) {
        checkOffset(offset, 4, buffer.length);
    }
    return readUInt32(buffer, offset, true);
};

Buffer.readInt8 = function(buffer, offset, noAssert) {
    offset = ~~offset;
    if (!noAssert) {
        checkOffset(offset, 1, buffer.length);
    }
    if (!(buffer[offset] & 0x80)) {
        return (buffer[offset]);
    }
    return ((0xff - buffer[offset] + 1) * -1);
};


function readInt16(buffer, offset, isBigEndian) {
    var val = readUInt16(buffer, offset, isBigEndian);
    if (!(val & 0x8000)) {
        return val;
    }
    return (0xffff - val + 1) * -1;
}


Buffer.readInt16LE = function(buffer, offset, noAssert) {
    offset = ~~offset;
    if (!noAssert) {
        checkOffset(offset, 2, buffer.length);
    }
    return readInt16(buffer, offset, false);
};


Buffer.readInt16BE = function(buffer, offset, noAssert) {
    offset = ~~offset;
    if (!noAssert) {
        checkOffset(offset, 2, buffer.length);
    }
    return readInt16(buffer, offset, true);
};


function readInt32(buffer, offset, isBigEndian) {
    var val = readUInt32(buffer, offset, isBigEndian);
    if (!(val & 0x80000000)) {
        return (val);
    }
    return (0xffffffff - val + 1) * -1;
}


Buffer.readInt32LE = function(buffer, offset, noAssert) {
    offset = ~~offset;
    if (!noAssert) {
        checkOffset(offset, 4, buffer.length);
    }
    return readInt32(buffer, offset, false);
};


Buffer.readInt32BE = function(buffer, offset, noAssert) {
    offset = ~~offset;
    if (!noAssert) {
        checkOffset(offset, 4, buffer.length);
    }
    return readInt32(buffer, offset, true);
};

function checkInt(buffer, value, offset, ext, max, min) {
    if (value > max || value < min) {
        throw new TypeError('value is out of bounds');
    }
    if (offset + ext > buffer.length) {
        throw new RangeError('index out of range');
    }
}

Buffer.writeUInt8 = function(buffer, value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(buffer, value, offset, 1, 0xff, 0);
    }
    buffer[offset] = value;
    return offset + 1;
};


Buffer.writeUInt16LE = function(buffer, value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(buffer, value, offset, 2, 0xffff, 0);
    }
    buffer[offset] = value;
    buffer[offset + 1] = (value >>> 8);
    return offset + 2;
};


Buffer.writeUInt16BE = function(buffer, value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(buffer, value, offset, 2, 0xffff, 0);
    }
    buffer[offset] = (value >>> 8);
    buffer[offset + 1] = value;
    return offset + 2;
};


Buffer.writeUInt32LE = function(buffer, value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(buffer, value, offset, 4, 0xffffffff, 0);
    }
    buffer[offset + 3] = (value >>> 24);
    buffer[offset + 2] = (value >>> 16);
    buffer[offset + 1] = (value >>> 8);
    buffer[offset] = value;
    return offset + 4;
};


Buffer.writeUInt32BE = function(buffer, value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(buffer, value, offset, 4, 0xffffffff, 0);
    }
    buffer[offset] = (value >>> 24);
    buffer[offset + 1] = (value >>> 16);
    buffer[offset + 2] = (value >>> 8);
    buffer[offset + 3] = value;
    return offset + 4;
};


Buffer.writeInt8 = function(buffer, value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(buffer, value, offset, 1, 0x7f, -0x80);
    }
    buffer[offset] = value;
    return offset + 1;
};


Buffer.writeInt16LE = function(buffer, value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(buffer, value, offset, 2, 0x7fff, -0x8000);
    }
    buffer[offset] = value;
    buffer[offset + 1] = (value >>> 8);
    return offset + 2;
};


Buffer.writeInt16BE = function(buffer, value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(buffer, value, offset, 2, 0x7fff, -0x8000);
    }
    buffer[offset] = (value >>> 8);
    buffer[offset + 1] = value;
    return offset + 2;
};


Buffer.writeInt32LE = function(buffer, value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(buffer, value, offset, 4, 0x7fffffff, -0x80000000);
    }
    buffer[offset] = value;
    buffer[offset + 1] = (value >>> 8);
    buffer[offset + 2] = (value >>> 16);
    buffer[offset + 3] = (value >>> 24);
    return offset + 4;
};


Buffer.writeInt32BE = function(buffer, value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(buffer, value, offset, 4, 0x7fffffff, -0x80000000);
    }
    buffer[offset] = (value >>> 24);
    buffer[offset + 1] = (value >>> 16);
    buffer[offset + 2] = (value >>> 8);
    buffer[offset + 3] = value;
    return offset + 4;
};