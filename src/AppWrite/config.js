import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

import Conf from "../conf/conf";

export class Service {
  Client = new Client();
  databases;
  bucket;

  constructor() {
    this.Client.setEndpoint(Conf.appWriteURl).setEndpoint(Conf.projectID);
    this.databases = new Databases(this.Client);
    this.bucket = new Storage(this.Client);
  }

  async createPost({ title, slug, content, featuredImg, status, userId }) {
    try {
      return await this.databases.createDocument(
        Conf.databaseID,
        Conf.collectionID,
        slug,
        { title, content, featuredImg, status, userId }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImg, status }) {
    try {
      return await this.databases.updateDocument(
        Conf.databaseID,
        Conf.collectionID,
        slug,
        { title, content, featuredImg, status }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        Conf.databaseID,
        Conf.collectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      return false;
    }
  }

  async getPost({ slug }) {
    try {
      return await this.databases.getDocument(
        Conf.databaseID,
        Conf.collectionID,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", active)]) {
    try {
      return await this.databases.list(
        Conf.databaseID,
        Conf.collectionID,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts:: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(Conf.bucketID, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite service :: uploadFile:: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(Conf.bucketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile:: error", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    return this.bucket.getFilePreview(Conf.bucketID, fileId);
  }
}

const service = new Service();
export default service;
