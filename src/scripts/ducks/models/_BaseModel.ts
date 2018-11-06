export default abstract class BaseModel {
  private _isInit: boolean = false

  protected abstract createInitialState(): any

  public getInitialState() {
    if (this._isInit) {
      throw new Error('This method allows to call once.')
    }
    this._isInit = true
    return this.createInitialState()
  }
}
