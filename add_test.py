
# Code provided:

def add_numbers(a, b):
    return a + b

# Unit test code:

import unittest

class TestAddNumbers(unittest.TestCase):
    
    def test_add_positive_numbers(self):
        self.assertEqual(add_numbers(2, 3), 5)
    
    def test_add_negative_numbers(self):
        self.assertEqual(add_numbers(-2, -3), -5)
        
    def test_add_zero(self):
        self.assertEqual(add_numbers(0, 5), 5)
        
    def test_add_decimals(self):
        self.assertEqual(add_numbers(2.5, 3.5), 6)
        
    def test_add_string_numbers(self):
        self.assertEqual(add_numbers('2', '3'), '23')
        
    def test_add_invalid_input(self):
        with self.assertRaises(TypeError):
            add_numbers('2', 3)
        
if __name__ == '__main__':
    unittest.main()