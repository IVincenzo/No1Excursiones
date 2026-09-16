import {expect, test} from '@playwright/test';

test('localized home and activity are server rendered', async ({page}) => {
  await page.goto('/fr');
  await expect(page.locator('h1')).toContainText('Reservez');
  await page.goto('/fr/activites/sorties-en-bateau');
  await expect(page.locator('h1')).toHaveText('Sorties en bateau');
  await expect(page.locator('.booking-widget')).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('link[rel="alternate"]')).toHaveCount(4);
  if ((page.viewportSize()?.width ?? 1200) < 992) await page.locator('.navbar-toggler').click();
  await page.getByRole('button', {name: 'Language'}).click();
  await page.getByRole('link', {name: 'DE'}).click();
  await expect(page).toHaveURL(/\/de\/aktivitaeten\/bootsausfluege$/);
  await expect(page.locator('h1')).toHaveText('Bootsausfluege');
});

test('Payload admin is reachable while private users stay protected', async ({page, request}) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin/);
  const users = await request.get('/api/users');
  expect(users.status()).toBe(403);
});

test('legacy URL redirects to historical Spanish route', async ({page}) => {
  await page.goto('/activities/boat-trips.html');
  await expect(page).toHaveURL(/\/es\/actividades\/excursiones-en-barco$/);
});
