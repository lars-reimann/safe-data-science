import { describe, it , expect} from 'vitest';
import {positionToString, rangeToString} from "./stringification";

describe('positionToString', () => {
    it.each([
        {
            position: {line: 0, character: 0},
            expected: '0:0',
            id: '0:0',
        },
        {
            position: {line: 1, character: 0},
            expected: '1:0',
            id: '1:0',
        }
    ])('should convert position to string ($id)', ({position, expected}) => {
        expect(positionToString(position)).toBe(expected);
    });
});

describe('rangeToString', () => {
    it.each([
        {
            range: {start: {line: 0, character: 0}, end: {line: 0, character: 0}},
            expected: '0:0->0:0',
            id: '0:0->0:0',
        },
        {
            range: {start: {line: 0, character: 0}, end: {line: 1, character: 0}},
            expected: '0:0->1:0',
            id: '0:0->1:0',
        }
    ])('should convert range to string ($id)', ({range, expected}) => {
        expect(rangeToString(range)).toBe(expected);
    });
});
