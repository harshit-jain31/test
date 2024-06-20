import add


    Here is an example of how to write unit tests for the `add_numbers` function using Python's built-in `unittest` module:

    import unittest

    class TestAddNumbers(unittest.TestCase):
        def test_addition(self):
            self.assertEqual(add_numbers(2, 3), 5)
            self.assertEqual(add_numbers(-1, 1), 0)
            self.assertEqual(add_numbers(0, 0), 0)
            self.assertRaises(TypeError, add_numbers, 'a', 2)
            self.assertRaises(TypeError, add_numbers, 2, 'b')

    if __name__ == '__main__':
        unittest.main()