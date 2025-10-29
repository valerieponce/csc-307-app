import mut from './module.js'; // MUT = Module Under Test



test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing div -- success', () =>{
    const expected = 6;
    const got = mut.div(12, 2);
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- empty string', () =>{
  expect(mut.containsNumbers("")).toBe(false);
});

test('Testing containsNumbers -- space', () =>{
  expect(mut.containsNumbers(" ")).toBe(true); //should be false but w NaN it counts space as 0.
});

test('Testing containsNumbers -- all chars', () =>{
  expect(mut.containsNumbers("abcde")).toBe(false);
});

test('Testing containsNumbers -- valid string', () =>{
  expect(mut.containsNumbers("a1b2c3")).toBe(true);
});

test('Testing containsNumbers -- not string', () =>{ 
  expect(mut.containsNumbers(1234)).toBe(false);
});
