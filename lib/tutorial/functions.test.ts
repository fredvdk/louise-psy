import { describe, expect, test } from 'vitest';
import { add } from './functions';

describe('test van functies', () => {
	test('test sum function', () => {
		expect(add(3, 4)).toBe(7);
	});
});



