import {combineReducers} from "@reduxjs/toolkit";
import {globalReducer} from "./global/global.slices";
import {postsReducer} from "./posts/posts.slices";
import {categoriesReducer} from "./categories/categories.slices";
import {commentsReducer} from "./comments/comments.slices";
import {authorsReducer} from "./authors/authors.slices";
import {tagsReducer} from "./tags/tags.slices";
import {notificationsReducer} from "./notifications/notifications.slices";

export const rootReducer = combineReducers({
    global: globalReducer,
    posts: postsReducer,
    categories: categoriesReducer,
    comments: commentsReducer,
    authors: authorsReducer,
    tags: tagsReducer,
    notifications: notificationsReducer,
});