import add


    import unittest
    
    class TestAddNumbers(unittest.TestCase):
        
        def test_positive_numbers(self):
            result = add_numbers(5, 10)
            self.assertEqual(result, 15)
        
        def test_negative_numbers(self):
            result = add_numbers(-5, -10)
            self.assertEqual(result, -15)
        
        def test_zero(self):
            result = add_numbers(0, 10)
            self.assertEqual(result, 10)
            
        def test_decimals(self):
            result = add_numbers(3.14, 2.86)
            self.assertEqual(result, 6)
        
        def test_string_input(self):
            with self.assertRaises(TypeError):
                add_numbers("5", 10)
                
        def test_list_input(self):
            with self.assertRaises(TypeError):
                add_numbers([1,2,3], 5)
                
        def test_no_input(self):
            with self.assertRaises(TypeError):
                add_numbers()
        
if __name__ == '__main__':
    unittest.main()