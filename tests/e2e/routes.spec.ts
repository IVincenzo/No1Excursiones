import {expect, test} from '@playwright/test';

test('localized home and activity are server rendered', async ({page}) => {
  await page.goto('/fr');
  await expect(page.locator('h1')).toContainText('Réserve');
  await page.goto('/fr/activites/sorties-en-bateau');
  await expect(page.locator('h1')).toHaveText('Sorties en bateau');
  await expect(page.locator('.booking-widget')).toBeVisible();
});

test('legacy URL redirects to historical Spanish route', async ({page}) => {
  await page.goto('/activities/boat-trips.html');
  await expect(page).toHaveURL(/\/es\/actividades\/excursiones-en-barco$/);
});

