import { test, expect } from '@playwright/test';

const lastName : string = "Jadye";
const phoneNumber : string = "0226216269"; 
const password : string = "Welcome";
const errorMessageForPhoneNumber : string = "The phone number should contain at least 10 digits!";
const passowrdPlaceholder : string = "Enter password"

test('Verify that Last Name is correct after the registeration is completed' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    await page.getByPlaceholder("Enter last name").fill(lastName);
    await page.getByPlaceholder("Enter phone number").fill(phoneNumber);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole('button', {name: 'Register'}).click();

    const result = await page.locator('#resultLn').textContent();
    const registeredLastName = result?.replace(/^.*:\s*/, '');
    expect(registeredLastName).toEqual(lastName);
})

test('Verify that First Name should be a mandatory field' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    const firstNameField = await page.locator('label[for="firstName"]').textContent();
    expect(firstNameField).toEqual('First Name*');
})

test('Verify that Last Name should be a mandatory field' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    await page.getByPlaceholder("Enter phone number").fill(phoneNumber);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole('button', {name: 'Register'}).click();

    const note = await page.locator('#lnHelp').textContent();
    const alertMessage = await page.locator('#message').textContent();
    expect(alertMessage).toEqual(note);
})

test('Verify that Email should be a mandatory field' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    await page.getByPlaceholder("Enter phone number").fill(phoneNumber);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole('button', {name: 'Register'}).click();


    const note = await page.locator('#lnHelp').textContent();
    const alertMessage = await page.locator('#message').textContent();
    expect(alertMessage).toEqual(note);
})

test('Verify that label name for Phone number is correct' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    const result = await page.locator('label[for="lastName"]').nth(1).textContent();
    const labelName = result?.replace(/\*/g, '');
    expect(labelName).toEqual('Phone number');
})

test('Verify that phone number is correct after the registeration is completed' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    await page.getByPlaceholder("Enter last name").fill(lastName);
    await page.getByPlaceholder("Enter phone number").fill(phoneNumber);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole('button', {name: 'Register'}).click();

    const result = await page.locator('#resultPhone').textContent();
    const registeredPhoneNumber = result?.replace(/^.*:\s*/, '');
    expect(registeredPhoneNumber).toEqual(phoneNumber);
})

test('Verify that phone number does not contain letters' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    await page.getByPlaceholder("Enter last name").fill(lastName);
    await page.getByPlaceholder("Enter phone number").fill("022621abcd");
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole('button', {name: 'Register'}).click();

    const result = await page.locator('#resultPhone').textContent();
    const registeredPhoneNumber = result?.replace(/^.*:\s*/, '');
    expect(registeredPhoneNumber).toMatch(/^\d+$/);
})

test('Verify that phone number does not contain special characters' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    await page.getByPlaceholder("Enter last name").fill(lastName);
    await page.getByPlaceholder("Enter phone number").fill("022621!@&*");
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole('button', {name: 'Register'}).click();

    const result = await page.locator('#resultPhone').textContent();
    const registeredPhoneNumber = result?.replace(/^.*:\s*/, '');
    expect(registeredPhoneNumber).toMatch(/^\d+$/);
})

test('Verify that phone number should not exceed more than 15 digits' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    await page.getByPlaceholder("Enter last name").fill(lastName);
    await page.getByPlaceholder("Enter phone number").fill("0226216269123456");
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole('button', {name: 'Register'}).click();

    const registeredPhoneNumber = (await page.getByPlaceholder("Enter phone number").inputValue()).length
    expect(registeredPhoneNumber).toBeLessThanOrEqual(15);
})

test('Verify that T&C checkbox should be enabled' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    expect(await page.locator('#exampleCheck1').isEnabled()).toBeTruthy();
})

test('Verify that country should be empty in the displayed information if the user does not select one' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    await page.getByPlaceholder("Enter last name").fill(lastName);
    await page.getByPlaceholder("Enter phone number").fill(phoneNumber);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole('button', {name: 'Register'}).click();

    const result = await page.locator('#country').textContent();
    const registeredCountry = result?.replace(/^.*:\s*/, '');
    expect(registeredCountry).toEqual("");
})

test('Verify that user can enter a password from 6 to 20 character both inclusive' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    await page.getByPlaceholder("Enter last name").fill(lastName);
    await page.getByPlaceholder("Enter phone number").fill(phoneNumber);
    await page.getByPlaceholder("Password").fill("Welcometonewzealand1");
    await page.getByRole('button', {name: 'Register'}).click();

    const alertMessage = await page.locator('#message').textContent();
    expect(alertMessage).toContain("Successfully");
})

test('Verify that error message should be precise if the user directly tries to register' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    await page.getByRole('button', {name: 'Register'}).click();

    const note = await page.locator('#lnHelp').textContent();
    const alertMessage = await page.locator('#message').textContent();
    expect(alertMessage).toEqual(note);
})

test('Verify that error mesasage is correctly displayed for invalid phone number' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    await page.getByPlaceholder("Enter last name").fill(lastName);
    await page.getByPlaceholder("Enter phone number").fill("022621626");
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole('button', {name: 'Register'}).click();

    const alertMessage = await page.locator('#message').textContent();
    expect(alertMessage).toEqual(errorMessageForPhoneNumber);
})

test('Verify that placeholder for password field is correct' , async ({ page }) => {
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    const result = await page.getByPlaceholder("Password").getAttribute('placeholder');
    expect(result).toEqual(passowrdPlaceholder);
})

