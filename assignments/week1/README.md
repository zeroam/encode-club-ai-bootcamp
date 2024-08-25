# WeekendProejct
- This is week1 proeject from [Lesson-04](https://github.com/Encode-Club-AI-Bootcamp/Generative-AI-Applications/tree/main/Lesson-04)

## Prerequisite
1. Giving it its own personality
2. Only respond three specific types of user inputs
    - a. Ingredient-based dish suggestions
    - b. Recipe requests for specific dishes
    - c. Recipe critiques and improvement suggestions
3. If user's initial input doesn't match these scenarios, politely decline and prompt for a valid request
    - For ingredient inputs: Suggest only dish names without full recipes.
    - For dish name inputs: Provide a detailed recipe.
    - For recipe inputs: Offer a constructive critique with suggested improvements.
4. Conduct a comprehensive experiment and compile a simple report documenting
    - 1. suggest a dish based on given ingredients
    - 2. request a recipe for that dish with a different personality
    - 3. critique the provided recipe with a different personality


## Result
- you can see this result's log from [chef_gpt_2024-08-25_19-34-03](./chef_gpt_2024-08-25_19-34-03.txt)
- this result can be reproducible from [chef_gpt.py](./chef_gpt.py)
- you can also see other failed logs from `check_gpt_*.txt`
- personality is written from `personalities/*.txt`

### 1. Suggest a dish based on given ingredient ([alex](./personalities/alex.txt))
```text
Question: What ingredients do you have?:
User input: cheese, egg, bacon, spagetti
System output(alex): How about trying "Spaghetti alla Carbonara"? It's a delightful Italian dish that combines those ingredients beautifully!
```

### 2. request a recipe for that dish ([nonna](./personalities/nonna.txt))
```text
Question: Which dish would you like a recipe for?:
User input: Spaghetti alla Carbonara
System output(nonna): Absolutely! Here’s a detailed recipe for Spaghetti alla Carbonara:

**Ingredients:**
- 400g spaghetti
- 150g guanciale (or pancetta), diced
- 3 large eggs
- 100g Pecorino Romano cheese, grated
- Freshly cracked black pepper
- Salt (for pasta water)
- Optional: Fresh parsley, chopped (for garnish)

**Instructions:**

1. **Cook the Pasta:**
   - Bring a large pot of salted water to a boil. Add the spaghetti and cook until al dente, following package instructions. Reserve about 1 cup of pasta cooking water, then drain.

2. **Prepare the Guanciale:**
   - In a large skillet over medium heat, add the diced guanciale. Cook until crispy and golden, about 5-7 minutes. Remove from heat.

3. **Make the Sauce:**
   - In a mixing bowl, whisk together the eggs, grated Pecorino Romano cheese, and a generous amount of freshly cracked black pepper until well combined and creamy.

4. **Combine Pasta and Guanciale:**
   - Add the drained spaghetti to the skillet with the crispy guanciale. Toss to combine, allowing the heat from the pasta to warm the guanciale.

5. **Add the Egg Mixture:**
   - Remove the skillet from heat (to prevent scrambling the eggs). Quickly pour the egg and cheese mixture onto the pasta, tossing continuously. The residual heat should create a creamy sauce. Add reserved pasta water a little at a time if needed to achieve desired creaminess.

6. **Serve:**
   - Plate the pasta immediately, topped with extra Pecorino Romano, freshly cracked black pepper, and optional chopped parsley for garnish.

**Enjoy your Spaghetti alla Carbonara!**
User input: Can you critique the recipe and suggest improvements?:
Absolutely! Here’s a detailed recipe for Spaghetti alla Carbonara:

**Ingredients:**
- 400g spaghetti
- 150g guanciale (or pancetta), diced
- 3 large eggs
- 100g Pecorino Romano cheese, grated
- Freshly cracked black pepper
- Salt (for pasta water)
- Optional: Fresh parsley, chopped (for garnish)

**Instructions:**

1. **Cook the Pasta:**
   - Bring a large pot of salted water to a boil. Add the spaghetti and cook until al dente, following package instructions. Reserve about 1 cup of pasta cooking water, then drain.

2. **Prepare the Guanciale:**
   - In a large skillet over medium heat, add the diced guanciale. Cook until crispy and golden, about 5-7 minutes. Remove from heat.

3. **Make the Sauce:**
   - In a mixing bowl, whisk together the eggs, grated Pecorino Romano cheese, and a generous amount of freshly cracked black pepper until well combined and creamy.

4. **Combine Pasta and Guanciale:**
   - Add the drained spaghetti to the skillet with the crispy guanciale. Toss to combine, allowing the heat from the pasta to warm the guanciale.

5. **Add the Egg Mixture:**
   - Remove the skillet from heat (to prevent scrambling the eggs). Quickly pour the egg and cheese mixture onto the pasta, tossing continuously. The residual heat should create a creamy sauce. Add reserved pasta water a little at a time if needed to achieve desired creaminess.

6. **Serve:**
   - Plate the pasta immediately, topped with extra Pecorino Romano, freshly cracked black pepper, and optional chopped parsley for garnish.

**Enjoy your Spaghetti alla Carbonara!**
```

### 3. Critique the provided recipe from given recipe ([zack](./personalities/zack.txt))
```text
System output(zack): Thank you for sharing your recipe for Spaghetti alla Carbonara! It’s a classic dish, but here are some critiques and suggestions for improvement:

### Critique:
1. **Texture Balance:** While the dish highlights the creaminess of the egg mixture, consider incorporating a sensory element to enhance the experience. The contrast of textures is currently limited to the pasta and the guanciale fat.

2. **Flavor Depth:** The traditional recipe is great, but you could elevate the flavor with additional aromatics or umami enhancements. Right now, it relies mostly on the guanciale and cheese for flavor.

3. **Presentation:** Serving suggestions are minimal. Adding a visual element can elevate the dish even further. Presentation plays a key role in the dining experience.

### Suggested Improvements:
1. **Add Aromatics:** Consider sautéing minced garlic or shallots in the fat rendered from the guanciale before adding the pasta. This will add depth of flavor without overpowering the dish.

2. **Using a Flavor Balancer:** A splash of white wine or a hint of lemon zest in the sauce can bring out a refreshing contrast to the richness of the egg and cheese mixture.

3. **Textural Variation:** To enhance the textural aspect, you could create a crispy topping using panko breadcrumbs mixed with dried herbs and a bit of guanciale fat, then toast it to add crunch.

4. **Interactive Element:** To add a molecular gastronomy touch, consider introducing an egg yolk sphere made from spherification techniques, which could burst with flavor as diners bite into it. This playful element would be a delightful surprise.

5. **Herb Infusion:** Garnishing with fresh herbs (such as chervil or basil) instead of or in addition to parsley can introduce new flavor notes and freshness, enhancing both aroma and visual appeal.

Incorporating these suggestions would provide a more dynamic, flavorful, and visually appealing version of your Spaghetti alla Carbonara! Enjoy the exploration!
```