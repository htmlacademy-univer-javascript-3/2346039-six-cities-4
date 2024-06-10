import { Page } from '@playwright/test';

const generateRandomEmail = () => `${Math.random().toString(36).substring(7)}@example.com`;

const loginActions = async (page: Page) => {
  await page.waitForURL(/login*/gi);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(generateRandomEmail());
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('password1');
  await page.getByRole('button', { name: 'Sign in' }).click();
};

export const loginWithRedirect = async (page: Page) => {
  const prevUrl = page.url()!;
  const offerId = prevUrl.split('/').pop();
  await page.goto(`./login?redirect=/offer/${offerId}`);
  await loginActions(page);
  await page.waitForURL('./');
  await page.goto(`./offer/${offerId}`);
};

export const login = async (page: Page) => {
  await page.goto('/login');
  await loginActions(page);
  await page.waitForURL('./');
};