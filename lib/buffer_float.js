/* global Buffer: true */
/* global checkOffset: true */

function readFloatGeneric(buffer, offset, precision, isBigEndian) {
    var value = 0;

    if (isBigEndian) {
        value  = buffer[offset + 1] << 16;
        value |= buffer[offset + 2] << 8;
        value |= buffer[offset + 3];
        value  = value + (buffer[offset] << 24 >>> 0);
    } else {
        value  = buffer[offset + 2] << 16;
        value |= buffer[offset + 1] << 8;
        value |= buffer[offset];
        value  = value + (buffer[offset + 3] << 24 >>> 0);
    }

    var sign = (value & 0x80000000) ? -1 : 1;
    var exponent = ((value >> 23) & 0xFF) - 127;
    var significand = (value & ~(-1 << 23));

    if (exponent === 128) {
        return sign * ((significand) ? Number.NaN : Number.POSITIVE_INFINITY);
    }

    if (exponent === -127) {
        if (significand === 0) {
            return sign * 0.0;
        }
        exponent = -126;
        significand /= (1 << 22);
    } else {
        significand = (significand | (1 << 23)) / (1 << 23);
    }

    return sign * significand * Math.pow(2, exponent);    
}

Buffer.readFloatLE = function (buffer, offset, noAssert) {
    offset = ~~offset;
    if (!noAssert) {
        checkOffset(offset, 4, buffer.length); 
    }
    return readFloatGeneric(buffer, offset, 4, false);
};
Buffer.readFloatBE = function (buffer, offset, noAssert) {
    offset = ~~offset;
    if (!noAssert) {
        checkOffset(offset, 4, buffer.length); 
    }
    return readFloatGeneric(buffer, offset, 4, true);
    
};