import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { addCategoryThunk, getCategoriesThunk, editCategoryThunk } from './category'

const db = require('../../server/db')
const Category = db.models.category

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Category Redux', () => {
  describe('thunk creators', () => {
    let store
    let mockAxios

    const initialState = {categories: []}

    const add1 = {
      name: 'Pizza'
    }

    const cat1 = {
      name: 'Shoes'
    }

    const cat2 = {
      name: 'Electronics'
    }

    const edit1 = {
      id: 1,
      title: 'Xmas'
    }

    beforeEach(async () => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
      await Category.create(cat1)
      await Category.create(cat2)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    it('getCategories retrieves all categories', async () => {
      const categories = await Category.findAll()
      mockAxios.onGet('/api/products/categories').replyOnce(201, categories)
      await store.dispatch(getCategoriesThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.equal('GET_CATEGORIES')
      expect(actions[0].categories.length).to.equal(2)
    })

    it('addCategoryThunk adds a category', async () => {
      mockAxios.onPost('/api/admin/categories/add').replyOnce(201, add1)
      await store.dispatch(addCategoryThunk(add1))
      const actions = store.getActions()
      expect(actions[0].type).to.equal('ADD_CATEGORY')
      expect(actions[0].category).to.deep.equal(add1)
    })

    xit('editCategoryThunk edits a category', async () => {
      mockAxios.onPut('api/admin/categories/1', edit1).replyOnce(201, edit1)
      await store.dispatch(editCategoryThunk(edit1))
      const actions = store.getActions()
      expect(actions[0].type).to.equal('EDIT_CATEGORY')
      expect(actions[0].category).to.deep.equal(edit1)
    })

    xit('removeCategoryThunk removes a category', async() => {

    })
  })
})
