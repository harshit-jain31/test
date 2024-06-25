const module = require('./Calculator.js');


    // Calculator.test.js
const Calculator = require('./Calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('adds two numbers correctly', () => {
    expect(calculator.add(2, 3)).toBe(5);
  });

  test('subtracts two numbers correctly', () => {
    expect(calculator.subtract(7, 4)).toBe(3);
  });

  test('multiplies two numbers correctly', () => {
    expect(calculator.multiply(2, 3)).toBe(6);
  });

  test('divides two numbers correctly', () => {
    expect(calculator.divide(8, 2)).toBe(4);
  });

  test('throws an error when dividing by zero', () => {
    expect(() => calculator.divide(0, 2)).toThrow('Cannot divide by zero');
  });
});