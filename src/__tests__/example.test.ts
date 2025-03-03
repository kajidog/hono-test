import { describe, expect, it } from 'bun:test';
import { isDefined, isString, isStringWithValue } from '../client/core/request';

describe('ユーティリティ関数のテスト', () => {
  describe('isDefined', () => {
    it('nullの場合はfalseを返す', () => {
      expect(isDefined(null)).toBe(false);
    });

    it('undefinedの場合はfalseを返す', () => {
      expect(isDefined(undefined)).toBe(false);
    });

    it('値が存在する場合はtrueを返す', () => {
      expect(isDefined('test')).toBe(true);
      expect(isDefined(0)).toBe(true);
      expect(isDefined(false)).toBe(true);
      expect(isDefined({})).toBe(true);
    });
  });

  describe('isString', () => {
    it('文字列の場合はtrueを返す', () => {
      expect(isString('test')).toBe(true);
      expect(isString('')).toBe(true);
    });

    it('文字列以外の場合はfalseを返す', () => {
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
    });
  });

  describe('isStringWithValue', () => {
    it('空でない文字列の場合はtrueを返す', () => {
      expect(isStringWithValue('test')).toBe(true);
    });

    it('空文字列の場合はfalseを返す', () => {
      expect(isStringWithValue('')).toBe(false);
    });

    it('文字列以外の場合はfalseを返す', () => {
      expect(isStringWithValue(123)).toBe(false);
      expect(isStringWithValue(null)).toBe(false);
      expect(isStringWithValue(undefined)).toBe(false);
    });
  });
}); 