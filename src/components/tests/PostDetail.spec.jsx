import { render } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import PostDetail from "../PostDetail";

import * as router from "react-router";
import { BrowserRouter } from "react-router-dom";

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

// Mock post data for testing
const post = {
  id: 1,
  title: "Test Post",
  image: "test-image.jpg",
  createdBy: "Test User",
  tagsArray: ["tag1", "tag2"],
};

it("should renders post detail correctly", () => {
  // Render the component with test data
  const { getByText, getByAltText } = render(
    <BrowserRouter>
      <PostDetail post={post} />
    </BrowserRouter>
  );

  // Assertions
  expect(getByAltText(post.title)).toBeTruthy(); // Check if image alt text is rendered
  expect(getByText(post.title)).toBeTruthy(); // Check if post title is rendered
  expect(getByText(post.createdBy)).toBeTruthy(); // Check if post creator is rendered

  // Check if link is rendered with correct href
  const link = getByText("Ler");
  expect(link).toBeTruthy();
  // expect(link).toHaveAttribute('href', `/posts/${post.id}`);
});

it("should render tags correctly", () => {
  const { getByText } = render(
    <BrowserRouter>
      <PostDetail post={post} />
    </BrowserRouter>
  );

  // Verifique se cada tag está presente
  post.tagsArray.forEach((tag) => {
    const tags = getByText(tag);
    expect(tags).toBeTruthy();
  });
});
