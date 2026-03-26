import { Page, Locator } from '@playwright/test';

type stringOrUndefined = string | undefined;

export class SelectCampaignPage {
  private readonly searchDropdown: Locator;
  private readonly searchInput: Locator;
  private readonly campaignTable: Locator;

  constructor(private page: Page) {
    this.searchDropdown = page.locator('#search-criteria');
    this.searchInput = page.locator('#search-input');
    this.campaignTable = page.locator('#campaign-table');
  }

  async selectCampaign(searchOption?: string, searchInput?: string) {

    await this.campaignTable.waitFor({ state: 'visible' });
    if(searchOption) {
      await this.searchDropdown.selectOption({ label: searchOption });
    }
    if(searchInput) {

      // Capture the current table state to know when it updates
      const firstRowBefore = await this.page.locator('#campaign-table tbody tr').first().innerText();

      await this.searchInput.fill(searchInput);
      //await this.searchInput.dispatchEvent('input');

      // WAIT for the table to refresh
      // This ensures fetchCampaigns/displayCampaigns has finished
      await this.page.waitForFunction((oldText) => {
          const firstRow = document.querySelector('#campaign-table tbody tr');
          return firstRow && firstRow.textContent !== oldText;
        }, firstRowBefore, { timeout: 5000 }).catch(() => {
            console.log("Table did not change, result might already be at the top.");
      });

      const button = this.page.locator(`button[onclick*="${searchInput}"]`);
      await button.waitFor({ state: 'visible' });
      await button.click();
    }
    else {
      const selectButtons = this.page.locator('button:has-text("Select")');
      await selectButtons.first().click();
    }
  }
  
   getPage() {
        return this.page;
    }
}
