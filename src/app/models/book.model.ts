export class Book {
  public title: String;
  public title_vo: String;
  public abstract: String;
  public category_id: Number;
  public collection_id: Number;
  public cover: Boolean;
  public editorial: String;
  public id: Number;
  public isbn: String;
  public pages: Number;
  public reading_date: String;
  public created_at: Date;
  public updated_at: Date;
  public url: String;
  public year: Number;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
