import { test, expect } from "@playwright/test";

test.describe('Not Found Service Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should show not found page for unknown offers', async ({ page }) => {
        await page.goto('/offers/i-do-not-exist');
        await expect(page.locator('img')).toHaveAttribute("src", "img/404.jpg");
        await expect(page.locator('p')).toHaveText("Тут ничего нет), ну, кроме поезда, нажмешь на него, вернешься туда, откуда пришел C:");
    })

    test('should throw back to main upon click on image', async ({ page }) => {
        await page.goto('/offers/i-do-not-exist');
        await page.locator('img').click();
        await expect(page.getByRole('link', { name: 'Amsterdam' })).toBeVisible();
    })
});