import { test, expect } from '@playwright/test';

test.describe('Sorting Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.cities__card');
  });

  test('should correctly sort items by price in ascending and descending order', async ({ page }) => {
    await page.locator('span').filter({ hasText: 'Popular' }).click();
    await page.locator('li').filter({ hasText: 'Price: low to high' }).click();
    await page.waitForSelector('.cities__card');

    const prices = await page.locator('.cities__card .place-card__price').evaluateAll(elements =>
      elements.map(el => el.textContent ?? '')
    );
    const sortedPricesLtH = prices.slice().sort((a, b) => parseFloat(a.replace('€', '')) - parseFloat(b.replace('€', '')));
    expect(prices).toEqual(sortedPricesLtH);

    await page.locator('span').filter({ hasText: 'Price: low to high' }).click();
    await page.locator('li').filter({ hasText: 'Price: high to low' }).click();
    await page.waitForSelector('.cities__card');

    const pricesHtL = await page.locator('.cities__card .place-card__price').evaluateAll(elements =>
      elements.map(el => el.textContent ?? '')
    );
    const sortedPricesHtL = pricesHtL.slice().sort((a, b) => parseFloat(b.replace('€', '')) - parseFloat(a.replace('€', '')));
    expect(pricesHtL).toEqual(sortedPricesHtL);
  });

  test('should correctly sort items by rating in descending order', async ({ page }) => {
    await page.locator('span').filter({ hasText: 'Popular' }).click();
    await page.locator('li').filter({ hasText: 'Top rated first' }).click();
    await page.waitForSelector('.cities__card');

    const ratings = await page.locator('.cities__card .place-card__rating').evaluateAll(elements =>
      elements.map(el => el.textContent ?? '')
    );
    const sortedRatings = ratings.slice().sort((a, b) => parseFloat(b) - parseFloat(a));
    expect(ratings).toEqual(sortedRatings);
  });

  test('should reset to default sorting after applying and then removing a sort', async ({ page }) => {
    const defaultPrices = await page.locator('.cities__card .place-card__price').evaluateAll(elements =>
      elements.map(el => el.textContent ?? '')
    );

    await page.locator('span').filter({ hasText: 'Popular' }).click();
    await page.locator('li').filter({ hasText: 'Price: low to high' }).click();
    await page.waitForSelector('.cities__card');

    const prices = await page.locator('.cities__card .place-card__price').evaluateAll(elements =>
      elements.map(el => el.textContent ?? '')
    );
    const sortedPricesLtH = prices.slice().sort((a, b) => parseFloat(a.replace('€', '')) - parseFloat(b.replace('€', '')));
    expect(prices).toEqual(sortedPricesLtH);

    await page.locator('span').filter({ hasText: 'Price: low to high' }).click();
    await page.locator('li').filter({ hasText: 'Popular' }).click();
    await page.waitForSelector('.cities__card');

    const pricesPopular = await page.locator('.cities__card .place-card__price').evaluateAll(elements =>
      elements.map(el => el.textContent ?? '')
    );
    expect(pricesPopular).toEqual(defaultPrices);
  });
});