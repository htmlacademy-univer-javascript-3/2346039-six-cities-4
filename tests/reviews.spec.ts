import { test, expect, Page } from '@playwright/test';
import { loginWithRedirect } from './utils.ts';

const clickOnFirstCard = async (page: Page) => {
  await page.locator('.cities__card').first().click();
  await page.waitForURL(/offer*/gi);
};

test.describe('Review Form Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await clickOnFirstCard(page);
  });

  test('should hide the review form when user is not logged in', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /reviews */gi })).toContainText('Reviews');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeHidden();
    await expect(page.getByRole('textbox')).toBeHidden();
  });

  test('should display the review form when user is logged in', async ({ page }) => {
    await loginWithRedirect(page);
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    await expect(page.getByRole('textbox')).toBeVisible();
  });

  test('should validate the review form fields', async ({ page }) => {
    await loginWithRedirect(page);
    await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();

    await page.getByTitle('not bad').getByRole('img').click();
    await page.getByPlaceholder('Tell how was your stay').fill('The stay was quite pleasant');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();

    await page.getByPlaceholder('Tell how was your stay').fill('The hotel was excellent, the staff were friendly, and the amenities were top-notch');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  test('should successfully submit the review form', async ({ page }) => {
    await loginWithRedirect(page);
    await page.getByPlaceholder('Tell how was your stay').fill('The hotel was excellent, the staff were friendly, and the amenities were top-notch');
    await page.getByTitle('not bad').getByRole('img').click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForSelector('.reviews__item');
    await expect(page.locator('.reviews__item').last()).toContainText('The hotel was excellent, the staff were friendly, and the amenities were top-notch');
  });
});