
import unittest

# Code to be tested
def add_numbers(a, b):
    return a + b

# Unit test code
class TestAddNumbers(unittest.TestCase):
    def test_add_numbers_positive(self):
        # Test addition with positive numbers
        result = add_numbers(2, 3)
        self.assertEqual(result, 5)

    def test_add_numbers_negative(self):
        # Test addition with negative numbers
        result = add_numbers(-5, -3)
        self.assertEqual(result, -8)

    def test_add_numbers_zero(self):
        # Test addition with zero
        result = add_numbers(0, 5)
        self.assertEqual(result, 5)

    def test_add_numbers_float(self):
        # Test addition with float numbers
        result = add_numbers(2.5, 3.5)
        self.assertEqual(result, 6)

    def test_add_numbers_string(self):
        # Test addition with string parameters
        result = add_numbers("Hello", "World")
        self.assertEqual(result, "HelloWorld")

    def test_add_numbers_list(self):
        # Test addition with list parameters
        result = add_numbers([1, 2], [3, 4])
        self.assertEqual(result, [1, 