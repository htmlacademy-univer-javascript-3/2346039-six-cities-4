import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('./login');
  });

  test('should display login page elements correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sign in');
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });

  test('should validate email and password fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="password"]:invalid')).toBeVisible();

    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('test');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
  });

  test('should redirect to home page with correct credentials', async ({ page }) => {
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('jane.doe@example.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('securePassword123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('./');

    await page.getByRole('link', { name: 'jane.doe' }).click();
    await page.waitForURL('./favorites');
    expect(page.url()).toBe('http://localhost:5173/favorites');
  });
});