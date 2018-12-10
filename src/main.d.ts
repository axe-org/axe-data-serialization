declare module 'axe-data-serialization' {

  /**
   * AXE数据项的类型。
   */
  export enum AXEDataItemType {
    Number, String, Array, Map, Image, Data, Date, Boolean, Model
  }

  /**
   * 一个具体的数据项的数据
   */
  export class AXEDataItem {
    /**
     * 初始化， 可以传入一个json对象。
     * @param json {type :"Number" | "String" | "Array" | "Map" | "Image" | "Data" | "Date" | "Boolean" | "Model" , value: String }
     */
    constructor(json: Object);

    /**
     * 获得该Item的具体值。
     */
    getValue():any;

    /**
     * 获得该Item的类型， 为 "Number" | "String" | "Array" | "Map" | "Image" | "Data" | "Date" | "Boolean" | "Model" 
     */
    getType():AXEDataItemType;
  }

  /**
   * Axe 数据类型。 简单来说是一个字典、Map或者称为Object， 根据Key值去设置或获取具体值， 可以转换为json对象或者使用json对象初始化。
   */
  export class AXEData {
    /**
     * 初始化， 可以传入一个json对象。
     * @param json 
     */
    constructor(json?: Object);
    /**
      * 设置 Number 类型
      */
    setNumber(key: string, value: number):void;
    /**
      * 设置 Boolean 类型
      */
    setBoolean(key: string, value: boolean):void;
    /**
      * 设置 String 类型
      */
    setString(key: string, value: string):void;
    /**
      * 设置 Array 类型
      */
    setArray(key: string, value: any[]):void;
    /**
      * 设置 Map 类型 ,对于iOS中的NSDictionary , java中的 Map
      */
    setMap(key: string, value: Map):void;
    /**
      * 设置 Model 类型
      * Model类型为前后端交互操作中的model类型
      */
    setModel(key: string, value: object):void;
    /**
      * 设置 二进制数据， 对应iOS中的 NSData， java中的 Byte Array . 
      * 而在 js中读取和设置的是 base64的字符串。
      * @param value 值， 为base64字符串。
      */
    setData(key: string, value: string):void;
    /**
      * 设置 图片类型，对应iOS中的 UIImage, Java中的 Image类型。
      * 而在 js中读取和设置的是 base64的uri字符串 ， 如 data:image/jpeg;base64,xxxx
      * @param value 值， 为base64的uri字符串。
      */
    setImage(key: string, value: string):void;
    /**
      * 设置 Date类型 对应iOS中的 NSDate， java中的 Date . 
      * 
      * @param value 值， Date类型。
      */
    setDate(key: string, value: Date):void;

    /**
      * 删除某项数据。
      * 
      */
    removeItem(key: string):void;
    /**
     * 最终执行的读取方法，不需要指定类型，而是根据约束去读， 所以API文档一定要写清楚。
     * undefined 表示出错。 而null表示为空。
     * @param key 
     */
    getItem(key: string):any;
    /**
     * 最终执行的设置方法， 
     * 保存序列化的数据。
     * @param key 
     * @param item 序列化的数据。
     */
    setItem(key: string, serializationdata: AXEDataItem);

    /**
     * 获得 json object 
     */
    toJson():Object;

    /**
     * 获取原有数据， 以分析数据类型。
     * @param key 键值。
     * 如果不存在，则返回 null。
     */
    getDataItemForKey(key: string):AXEDataItem;
  }

  export interface IS {

    /**
     * 检测函数。
     * @param obj 
     */
    Number(obj: any):Boolean;

    /**
     * 检测函数。
     * @param obj 
     */
    Boolean(obj: any):Boolean;

    /**
     * 检测函数。
     * @param obj 
     */
    String(obj: any):Boolean;

    /**
     * 检测函数。
     * @param obj 
     */
    Object(obj: any):Boolean;

    /**
     * 检测函数。
     * @param obj 
     */
    Map(obj: any):Boolean;
    /**
     * 检测函数。
     * @param obj 
     */
    Array(obj: any):Boolean;

    /**
     * 检测函数。
     * @param obj 
     */
    Date(obj: any):Boolean;

    /**
     * 检测函数。
     * @param obj 
     */
    RegEpx(obj: any):Boolean;

    /**
     * 检测函数。
     * @param obj 
     */
    Window(obj: any):Boolean;

    /**
     * 检测函数。
     * @param obj 
     */
    HTMLDocument(obj: any):Boolean;
  }
  /**
   * 检测判断。
   */
  export var is: IS;
}