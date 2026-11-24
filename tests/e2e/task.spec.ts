
import { test, expect } from "@playwright/test";

test.describe("Task Management E2E", () => {
  test("halaman utama berhasil dibuka", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Task Management" })
    ).toBeVisible();
  });

test("pengguna dapat menambahkan tugas", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("task-input").fill("Mengerjakan CI/CD");

    await page.getByTestId("add-task").click();

    await expect(
        page.getByText("Mengerjakan CI/CD", { exact: true })
    ).toBeVisible();
    });


  test("pengguna dapat menghapus tugas", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("task-input").fill("Tugas untuk dihapus");

    await page.getByTestId("add-task").click();

    const task = page
      .getByTestId("task-item")
      .filter({ hasText: "Tugas untuk dihapus" });

    await task.getByTestId("delete-task").click();

    await expect(task).toHaveCount(0);
  });

  test("pengguna dapat menandai tugas selesai", async ({ page }) => {
    await page.goto("/");

    const task = page.getByText("Belaja Jenkins");

    await task.click();

    await expect(task).toHaveClass(/line-through/);
  });
});
