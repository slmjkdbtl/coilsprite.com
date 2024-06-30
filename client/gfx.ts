export type TexFilter = "nearest" | "linear"
export type TexWrap = "repeat" | "clampToEdge"
export type ImageSource = Exclude<TexImageSource, VideoFrame>

export function deg2rad(deg: number): number {
	return deg * Math.PI / 180
}

export function rad2deg(rad: number): number {
	return rad * 180 / Math.PI
}

export type Vec2Args = [number, number] | [number] | [Vec2] | [number | Vec2] | []

export function lerp(
	a: number,
	b: number,
	t: number,
): number {
	return a + (b - a) * t
}

export function clamp(
	val: number,
	min: number,
	max: number,
): number {
	if (min > max) {
		return clamp(val, max, min)
	}
	return Math.min(Math.max(val, min), max)
}

export function vec2(...args: Vec2Args): Vec2 {
	if (args.length === 1) {
		if (args[0] instanceof Vec2) {
			return new Vec2(args[0].x, args[0].y)
		} else if (Array.isArray(args[0]) && args[0].length === 2) {
			return new Vec2(...args[0])
		}
	}
	// @ts-ignore
	return new Vec2(...args)
}

export class Vec2 {
	x: number = 0
	y: number = 0
	constructor(x: number = 0, y: number = x) {
		this.x = x
		this.y = y
	}
	static fromAngle(deg: number) {
		const angle = deg2rad(deg)
		return new Vec2(Math.cos(angle), Math.sin(angle))
	}
	static LEFT = new Vec2(-1, 0)
	static RIGHT = new Vec2(1, 0)
	static UP = new Vec2(0, -1)
	static DOWN = new Vec2(0, 1)
	clone(): Vec2 {
		return new Vec2(this.x, this.y)
	}
	add(...args: Vec2Args): Vec2 {
		const p2 = vec2(...args)
		return new Vec2(this.x + p2.x, this.y + p2.y)
	}
	sub(...args: Vec2Args): Vec2 {
		const p2 = vec2(...args)
		return new Vec2(this.x - p2.x, this.y - p2.y)
	}
	scale(...args: Vec2Args): Vec2 {
		const s = vec2(...args)
		return new Vec2(this.x * s.x, this.y * s.y)
	}
	dist(...args: Vec2Args): number {
		const p2 = vec2(...args)
		return this.sub(p2).len()
	}
	sdist(...args: Vec2Args): number {
		const p2 = vec2(...args)
		return this.sub(p2).slen()
	}
	len(): number {
		return Math.sqrt(this.dot(this))
	}
	slen(): number {
		return this.dot(this)
	}
	unit(): Vec2 {
		const len = this.len()
		return len === 0 ? new Vec2(0) : this.scale(1 / len)
	}
	normal(): Vec2 {
		return new Vec2(this.y, -this.x)
	}
	reflect(normal: Vec2) {
		return this.sub(normal.scale(2 * this.dot(normal)))
	}
	project(on: Vec2) {
		return on.scale(on.dot(this) / on.len())
	}
	reject(on: Vec2) {
		return this.sub(this.project(on))
	}
	dot(p2: Vec2): number {
		return this.x * p2.x + this.y * p2.y
	}
	cross(p2: Vec2): number {
		return this.x * p2.y - this.y * p2.x
	}
	angle(...args: Vec2Args): number {
		const p2 = vec2(...args)
		return rad2deg(Math.atan2(this.y - p2.y, this.x - p2.x))
	}
	angleBetween(...args: Vec2Args): number {
		const p2 = vec2(...args)
		return rad2deg(Math.atan2(this.cross(p2), this.dot(p2)))
	}
	lerp(dest: Vec2, t: number): Vec2 {
		return new Vec2(lerp(this.x, dest.x, t), lerp(this.y, dest.y, t))
	}
	slerp(dest: Vec2, t: number): Vec2 {
		const cos = this.dot(dest)
		const sin = this.cross(dest)
		const angle = Math.atan2(sin, cos)
		return this
			.scale(Math.sin((1 - t) * angle))
			.add(dest.scale(Math.sin(t * angle)))
			.scale(1 / sin)
	}
	isZero(): boolean {
		return this.x === 0 && this.y === 0
	}
	toFixed(n: number): Vec2 {
		return new Vec2(Number(this.x.toFixed(n)), Number(this.y.toFixed(n)))
	}
	transform(m: Mat4): Vec2 {
		return m.multVec2(this)
	}
	eq(other: Vec2): boolean {
		return this.x === other.x && this.y === other.y
	}
	bbox(): Rect {
		return new Rect(this, 0, 0)
	}
	toString(): string {
		return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`
	}
}

export class Rect {
	pos: Vec2
	width: number
	height: number
	constructor(pos: Vec2, width: number, height: number) {
		this.pos = pos.clone()
		this.width = width
		this.height = height
	}
	static fromPoints(p1: Vec2, p2: Vec2): Rect {
		return new Rect(p1.clone(), p2.x - p1.x, p2.y - p1.y)
	}
	center(): Vec2 {
		return new Vec2(this.pos.x + this.width / 2, this.pos.y + this.height / 2)
	}
	points(): [Vec2, Vec2, Vec2, Vec2] {
		return [
			this.pos,
			this.pos.add(this.width, 0),
			this.pos.add(this.width, this.height),
			this.pos.add(0, this.height),
		]
	}
	transform(m: Mat4): Polygon {
		return new Polygon(this.points().map((pt) => m.multVec2(pt)))
	}
	bbox(): Rect {
		return this.clone()
	}
	area(): number {
		return this.width * this.height
	}
	clone(): Rect {
		return new Rect(this.pos.clone(), this.width, this.height)
	}
	distToPoint(p: Vec2): number {
		return Math.sqrt(this.sdistToPoint(p))
	}
	sdistToPoint(p: Vec2): number {
		const min = this.pos
		const max = this.pos.add(this.width, this.height)
		const dx = Math.max(min.x - p.x, 0, p.x - max.x)
		const dy = Math.max(min.y - p.y, 0, p.y - max.y)
		return dx * dx + dy * dy
	}
}

export class Polygon {
	pts: Vec2[]
	constructor(pts: Vec2[]) {
		if (pts.length < 3) {
			throw new Error("Polygons should have at least 3 vertices")
		}
		this.pts = pts
	}
	transform(m: Mat4): Polygon {
		return new Polygon(this.pts.map((pt) => m.multVec2(pt)))
	}
	bbox(): Rect {
		const p1 = vec2(Number.MAX_VALUE)
		const p2 = vec2(-Number.MAX_VALUE)
		for (const pt of this.pts) {
			p1.x = Math.min(p1.x, pt.x)
			p2.x = Math.max(p2.x, pt.x)
			p1.y = Math.min(p1.y, pt.y)
			p2.y = Math.max(p2.y, pt.y)
		}
		return Rect.fromPoints(p1, p2)
	}
	area(): number {
		let total = 0
		const l = this.pts.length
		for (let i = 0; i < l; i++) {
			const p1 = this.pts[i]
			const p2 = this.pts[(i + 1) % l]
			total += (p1.x * p2.y * 0.5)
			total -= (p2.x * p1.y * 0.5)
		}
		return Math.abs(total)
	}
	clone(): Polygon {
		return new Polygon(this.pts.map((pt) => pt.clone()))
	}
}

export class Mat4 {

	m: number[] = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1,
	]

	constructor(m?: number[]) {
		if (m) {
			this.m = m
		}
	}

	static translate(p: Vec2): Mat4 {
		return new Mat4([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			p.x, p.y, 0, 1,
		])
	}

	static scale(s: Vec2): Mat4 {
		return new Mat4([
			s.x, 0, 0, 0,
			0, s.y, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		])
	}

	static rotateX(a: number): Mat4 {
		a = deg2rad(-a)
		const c = Math.cos(a)
		const s = Math.sin(a)
		return new Mat4([
			1, 0, 0, 0,
			0, c, -s, 0,
			0, s, c, 0,
			0, 0, 0, 1,
		])
	}

	static rotateY(a: number): Mat4 {
		a = deg2rad(-a)
		const c = Math.cos(a)
		const s = Math.sin(a)
		return new Mat4([
			c, 0, s, 0,
			0, 1, 0, 0,
			-s, 0, c, 0,
			0, 0, 0, 1,
		])
	}

	static rotateZ(a: number): Mat4 {
		a = deg2rad(-a)
		const c = Math.cos(a)
		const s = Math.sin(a)
		return new Mat4([
			c, -s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		])
	}

	translate(p: Vec2) {
		this.m[12] += this.m[0] * p.x + this.m[4] * p.y
		this.m[13] += this.m[1] * p.x + this.m[5] * p.y
		this.m[14] += this.m[2] * p.x + this.m[6] * p.y
		this.m[15] += this.m[3] * p.x + this.m[7] * p.y
		return this
	}

	scale(p: Vec2) {
		this.m[0] *= p.x
		this.m[4] *= p.y
		this.m[1] *= p.x
		this.m[5] *= p.y
		this.m[2] *= p.x
		this.m[6] *= p.y
		this.m[3] *= p.x
		this.m[7] *= p.y
		return this
	}

	rotate(a: number): Mat4 {
		a = deg2rad(-a)
		const c = Math.cos(a)
		const s = Math.sin(a)
		const m0 = this.m[0]
		const m1 = this.m[1]
		const m4 = this.m[4]
		const m5 = this.m[5]
		this.m[0] = m0 * c + m1 * s
		this.m[1] = -m0 * s + m1 * c
		this.m[4] = m4 * c + m5 * s
		this.m[5] = -m4 * s + m5 * c
		return this
	}

	// TODO: in-place variant
	mult(other: Mat4): Mat4 {
		const out = []
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				out[i * 4 + j] =
					this.m[0 * 4 + j] * other.m[i * 4 + 0] +
					this.m[1 * 4 + j] * other.m[i * 4 + 1] +
					this.m[2 * 4 + j] * other.m[i * 4 + 2] +
					this.m[3 * 4 + j] * other.m[i * 4 + 3]
			}
		}
		return new Mat4(out)
	}

	multVec2(p: Vec2): Vec2 {
		return new Vec2(
			p.x * this.m[0] + p.y * this.m[4] + this.m[12],
			p.x * this.m[1] + p.y * this.m[5] + this.m[13],
		)
	}

	getTranslation() {
		return new Vec2(this.m[12], this.m[13])
	}

	getScale() {
		if (this.m[0] != 0 || this.m[1] != 0) {
			const det = this.m[0] * this.m[5] - this.m[1] * this.m[4]
			const r = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1])
			return new Vec2(r, det / r)
		} else if (this.m[4] != 0 || this.m[5] != 0) {
			const det = this.m[0] * this.m[5] - this.m[1] * this.m[4]
			const s = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5])
			return new Vec2(det / s, s)
		} else {
			return new Vec2(0, 0)
		}
	}

	getRotation() {
		if (this.m[0] != 0 || this.m[1] != 0) {
			const r = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1])
			return rad2deg(this.m[1] > 0 ? Math.acos(this.m[0] / r) : -Math.acos(this.m[0] / r))
		} else if (this.m[4] != 0 || this.m[5] != 0) {
			const s = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5])
			return rad2deg(Math.PI / 2 - (this.m[5] > 0 ? Math.acos(-this.m[4] / s) : -Math.acos(this.m[4] / s)))
		} else {
			return 0
		}
	}

	getSkew() {
		if (this.m[0] != 0 || this.m[1] != 0) {
			const r = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1])
			return new Vec2(Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (r * r), 0)
		}
		else if (this.m[4] != 0 || this.m[5] != 0) {
			const s = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5])
			return new Vec2(0, Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (s * s))
		}
		else {
			return new Vec2(0, 0)
		}
	}

	invert(): Mat4 {

		const out = []

		const f00 = this.m[10] * this.m[15] - this.m[14] * this.m[11]
		const f01 = this.m[9] * this.m[15] - this.m[13] * this.m[11]
		const f02 = this.m[9] * this.m[14] - this.m[13] * this.m[10]
		const f03 = this.m[8] * this.m[15] - this.m[12] * this.m[11]
		const f04 = this.m[8] * this.m[14] - this.m[12] * this.m[10]
		const f05 = this.m[8] * this.m[13] - this.m[12] * this.m[9]
		const f06 = this.m[6] * this.m[15] - this.m[14] * this.m[7]
		const f07 = this.m[5] * this.m[15] - this.m[13] * this.m[7]
		const f08 = this.m[5] * this.m[14] - this.m[13] * this.m[6]
		const f09 = this.m[4] * this.m[15] - this.m[12] * this.m[7]
		const f10 = this.m[4] * this.m[14] - this.m[12] * this.m[6]
		const f11 = this.m[5] * this.m[15] - this.m[13] * this.m[7]
		const f12 = this.m[4] * this.m[13] - this.m[12] * this.m[5]
		const f13 = this.m[6] * this.m[11] - this.m[10] * this.m[7]
		const f14 = this.m[5] * this.m[11] - this.m[9] * this.m[7]
		const f15 = this.m[5] * this.m[10] - this.m[9] * this.m[6]
		const f16 = this.m[4] * this.m[11] - this.m[8] * this.m[7]
		const f17 = this.m[4] * this.m[10] - this.m[8] * this.m[6]
		const f18 = this.m[4] * this.m[9] - this.m[8] * this.m[5]

		out[0] = this.m[5] * f00 - this.m[6] * f01 + this.m[7] * f02
		out[4] = -(this.m[4] * f00 - this.m[6] * f03 + this.m[7] * f04)
		out[8] = this.m[4] * f01 - this.m[5] * f03 + this.m[7] * f05
		out[12] = -(this.m[4] * f02 - this.m[5] * f04 + this.m[6] * f05)

		out[1] = -(this.m[1] * f00 - this.m[2] * f01 + this.m[3] * f02)
		out[5] = this.m[0] * f00 - this.m[2] * f03 + this.m[3] * f04
		out[9] = -(this.m[0] * f01 - this.m[1] * f03 + this.m[3] * f05)
		out[13] = this.m[0] * f02 - this.m[1] * f04 + this.m[2] * f05

		out[2] = this.m[1] * f06 - this.m[2] * f07 + this.m[3] * f08
		out[6] = -(this.m[0] * f06 - this.m[2] * f09 + this.m[3] * f10)
		out[10] = this.m[0] * f11 - this.m[1] * f09 + this.m[3] * f12
		out[14] = -(this.m[0] * f08 - this.m[1] * f10 + this.m[2] * f12)

		out[3] = -(this.m[1] * f13 - this.m[2] * f14 + this.m[3] * f15)
		out[7] = this.m[0] * f13 - this.m[2] * f16 + this.m[3] * f17
		out[11] = -(this.m[0] * f14 - this.m[1] * f16 + this.m[3] * f18)
		out[15] = this.m[0] * f15 - this.m[1] * f17 + this.m[2] * f18

		const det =
			this.m[0] * out[0] +
			this.m[1] * out[4] +
			this.m[2] * out[8] +
			this.m[3] * out[12]

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				out[i * 4 + j] *= (1.0 / det)
			}
		}

		return new Mat4(out)

	}

	clone(): Mat4 {
		return new Mat4([...this.m])
	}

	toString(): string {
		return this.m.toString()
	}

}

export class Color {

	r: number = 255
	g: number = 255
	b: number = 255

	constructor(r: number, g: number, b: number) {
		this.r = clamp(r, 0, 255)
		this.g = clamp(g, 0, 255)
		this.b = clamp(b, 0, 255)
	}

	static fromArray(arr: number[]) {
		return new Color(arr[0], arr[1], arr[2])
	}

	static fromHex(hex: string | number) {
		if (typeof hex === "number") {
			return new Color(
				(hex >> 16) & 0xff,
				(hex >> 8) & 0xff,
				(hex >> 0) & 0xff,
			)
		} else if (typeof hex === "string") {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
			return new Color(
				parseInt(result[1], 16),
				parseInt(result[2], 16),
				parseInt(result[3], 16),
			)
		} else {
			throw new Error("Invalid hex color format")
		}
	}

	// TODO: use range of [0, 360] [0, 100] [0, 100]?
	static fromHSL(h: number, s: number, l: number) {

		if (s == 0) {
			return new Color(255 * l, 255 * l, 255 * l)
		}

		const hue2rgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1
			if (t > 1) t -= 1
			if (t < 1 / 6) return p + (q - p) * 6 * t
			if (t < 1 / 2) return q
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
			return p
		}

		const q = l < 0.5 ? l * (1 + s) : l + s - l * s
		const p = 2 * l - q
		const r = hue2rgb(p, q, h + 1 / 3)
		const g = hue2rgb(p, q, h)
		const b = hue2rgb(p, q, h - 1 / 3)

		return new Color(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255))

	}

	static RED = new Color(255, 0, 0)
	static GREEN = new Color(0, 255, 0)
	static BLUE = new Color(0, 0, 255)
	static YELLOW = new Color(255, 255, 0)
	static MAGENTA = new Color(255, 0, 255)
	static CYAN = new Color(0, 255, 255)
	static WHITE = new Color(255, 255, 255)
	static BLACK = new Color(0, 0, 0)

	clone(): Color {
		return new Color(this.r, this.g, this.b)
	}

	lighten(a: number): Color {
		return new Color(this.r + a, this.g + a, this.b + a)
	}

	darken(a: number): Color {
		return this.lighten(-a)
	}

	invert(): Color {
		return new Color(255 - this.r, 255 - this.g, 255 - this.b)
	}

	mult(other: Color): Color {
		return new Color(
			this.r * other.r / 255,
			this.g * other.g / 255,
			this.b * other.b / 255,
		)
	}

	lerp(dest: Color, t: number): Color {
		return new Color(
			lerp(this.r, dest.r, t),
			lerp(this.g, dest.g, t),
			lerp(this.b, dest.b, t),
		)
	}

	toHSL(): [number, number, number] {
		const r = this.r / 255
		const g = this.g / 255
		const b = this.b / 255
		const max = Math.max(r, g, b), min = Math.min(r, g, b)
		let h = (max + min) / 2
		let s = h
		const l = h
		if (max == min) {
			h = s = 0
		} else {
			const d = max - min
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break
				case g: h = (b - r) / d + 2; break
				case b: h = (r - g) / d + 4; break
			}
			h /= 6
		}
		return [h, s, l]
	}

	eq(other: Color): boolean {
		return this.r === other.r
			&& this.g === other.g
			&& this.b === other.b

	}

	toString(): string {
		return `rgb(${this.r}, ${this.g}, ${this.b})`
	}

	toHex(): string {
		return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1)
	}

}

export type UniformValue =
	number
	| Vec2
	| Color
	| Mat4
	| number[]
	| Vec2[]
	| Color[]

export type UniformKey = Exclude<string, "u_tex">
export type Uniform = Record<UniformKey, UniformValue>

export type TextureOpt = {
	filter?: TexFilter,
	wrap?: TexWrap,
}

export class Texture {

	ctx: GfxCtx
	src: null | ImageSource = null
	glTex: WebGLTexture
	width: number
	height: number

	constructor(ctx: GfxCtx, w: number, h: number, opt: TextureOpt = {}) {

		this.ctx = ctx
		const gl = ctx.gl
		this.glTex = ctx.gl.createTexture()
		ctx.onDestroy(() => this.free())

		this.width = w
		this.height = h

		const filter = {
			"linear": gl.LINEAR,
			"nearest": gl.NEAREST,
		}[opt.filter ?? ctx.opts.texFilter] ?? gl.NEAREST

		const wrap = {
			"repeat": gl.REPEAT,
			"clampToEadge": gl.CLAMP_TO_EDGE,
		}[opt.wrap] ?? gl.CLAMP_TO_EDGE

		this.bind()

		if (w && h) {
			gl.texImage2D(
				gl.TEXTURE_2D,
				0, gl.RGBA,
				w,
				h,
				0,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				null,
			)
		}

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap)
		this.unbind()

	}

	static fromImage(ctx: GfxCtx, img: ImageSource, opt: TextureOpt = {}): Texture {
		const tex = new Texture(ctx, img.width, img.height, opt)
		tex.update(img)
		tex.src = img
		return tex
	}

	update(img: ImageSource, x = 0, y = 0) {
		const gl = this.ctx.gl
		this.bind()
		gl.texSubImage2D(gl.TEXTURE_2D, 0, x, y, gl.RGBA, gl.UNSIGNED_BYTE, img)
		this.unbind()
	}

	bind() {
		this.ctx.pushTexture2D(this.glTex)
	}

	unbind() {
		this.ctx.popTexture2D()
	}

	free() {
		this.ctx.gl.deleteTexture(this.glTex)
	}

}

export class FrameBuffer {

	ctx: GfxCtx
	tex: Texture
	glFramebuffer: WebGLFramebuffer
	glRenderbuffer: WebGLRenderbuffer

	constructor(ctx: GfxCtx, w: number, h: number, opt: TextureOpt = {}) {

		this.ctx = ctx
		const gl = ctx.gl
		ctx.onDestroy(() => this.free())
		this.tex = new Texture(ctx, w, h, opt)
		this.glFramebuffer = gl.createFramebuffer()
		this.glRenderbuffer = gl.createRenderbuffer()
		this.bind()
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, w, h)
		gl.framebufferTexture2D(
			gl.FRAMEBUFFER,
			gl.COLOR_ATTACHMENT0,
			gl.TEXTURE_2D,
			this.tex.glTex,
			0,
		)
		gl.framebufferRenderbuffer(
			gl.FRAMEBUFFER,
			gl.DEPTH_STENCIL_ATTACHMENT,
			gl.RENDERBUFFER,
			this.glRenderbuffer,
		)
		this.unbind()
	}

	get width() {
		return this.tex.width
	}

	get height() {
		return this.tex.height
	}

	toImageData() {
		const gl = this.ctx.gl
		const data = new Uint8ClampedArray(this.width * this.height * 4)
		this.bind()
		gl.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.UNSIGNED_BYTE, data)
		this.unbind()
		// flip vertically
		const bytesPerRow = this.width * 4
		const temp = new Uint8Array(bytesPerRow)
		for (let y = 0; y < (this.height / 2 | 0); y++) {
			const topOffset = y * bytesPerRow
			const bottomOffset = (this.height - y - 1) * bytesPerRow
			temp.set(data.subarray(topOffset, topOffset + bytesPerRow))
			data.copyWithin(topOffset, bottomOffset, bottomOffset + bytesPerRow)
			data.set(temp, bottomOffset)
		}
		return new ImageData(data, this.width, this.height)
	}

	toDataURL() {
		const canvas = document.createElement("canvas")
		const c2d = canvas.getContext("2d")
		if (!c2d) {
			throw new Error("Failed to create canvas 2d context")
		}
		canvas.width = this.width
		canvas.height = this.height
		c2d.putImageData(this.toImageData(), 0, 0)
		return canvas.toDataURL()
	}

	clear() {
		const gl = this.ctx.gl
		gl.clear(gl.COLOR_BUFFER_BIT)
	}

	draw(action: () => void) {
		this.bind()
		action()
		this.unbind()
	}

	bind() {
		this.ctx.pushFramebuffer(this.glFramebuffer)
		this.ctx.pushRenderbuffer(this.glRenderbuffer)
		this.ctx.pushViewport({ x: 0, y: 0, w: this.width, h: this.height })
	}

	unbind() {
		this.ctx.popFramebuffer()
		this.ctx.popRenderbuffer()
		this.ctx.popViewport()
	}

	free() {
		const gl = this.ctx.gl
		gl.deleteFramebuffer(this.glFramebuffer)
		gl.deleteRenderbuffer(this.glRenderbuffer)
		this.tex.free()
	}

}

export class Shader {

	ctx: GfxCtx
	glProgram: WebGLProgram

	constructor(ctx: GfxCtx, vert: string, frag: string, attribs: string[]) {

		this.ctx = ctx
		ctx.onDestroy(() => this.free())

		const gl = ctx.gl
		const vertShader = gl.createShader(gl.VERTEX_SHADER)
		const fragShader = gl.createShader(gl.FRAGMENT_SHADER)

		gl.shaderSource(vertShader, vert)
		gl.shaderSource(fragShader, frag)
		gl.compileShader(vertShader)
		gl.compileShader(fragShader)

		const prog = gl.createProgram()
		this.glProgram = prog

		gl.attachShader(prog, vertShader)
		gl.attachShader(prog, fragShader)

		attribs.forEach((attrib, i) => gl.bindAttribLocation(prog, i, attrib))

		gl.linkProgram(prog)

		if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
			const vertError = gl.getShaderInfoLog(vertShader)
			if (vertError) throw new Error("VERTEX SHADER " + vertError)
			const fragError = gl.getShaderInfoLog(fragShader)
			if (fragError) throw new Error("FRAGMENT SHADER " + fragError)
		}

		gl.deleteShader(vertShader)
		gl.deleteShader(fragShader)

	}

	bind() {
		this.ctx.pushProgram(this.glProgram)
	}

	unbind() {
		this.ctx.popProgram()
	}

	send(uniform: Uniform) {
		const gl = this.ctx.gl
		for (const name in uniform) {
			const val = uniform[name]
			const loc = gl.getUniformLocation(this.glProgram, name)
			if (typeof val === "number") {
				gl.uniform1f(loc, val)
			} else if (val instanceof Mat4) {
				gl.uniformMatrix4fv(loc, false, new Float32Array(val.m))
			} else if (val instanceof Color) {
				gl.uniform3f(loc, val.r, val.g, val.b)
			} else if (val instanceof Vec2) {
				gl.uniform2f(loc, val.x, val.y)
			} else if (Array.isArray(val)) {
				const first = val[0]
				if (typeof first === "number") {
					gl.uniform1fv(loc, val as number[])
				} else if (first instanceof Vec2) {
					gl.uniform2fv(loc, val.map(v => [v.x, v.y]).flat())
				} else if (first instanceof Color) {
					gl.uniform3fv(loc, val.map(v => [v.r, v.g, v.b]).flat())
				}
			} else {
				throw new Error("Unsupported uniform data type")
			}
		}
	}

	free() {
		this.ctx.gl.deleteProgram(this.glProgram)
	}

}

export type VertexFormat = {
	name: string,
	size: number,
}[]

export class BatchRenderer {

	ctx: GfxCtx

	glVBuf: WebGLBuffer
	glIBuf: WebGLBuffer
	vqueue: number[] = []
	iqueue: number[] = []
	stride: number
	maxVertices: number
	maxIndices: number

	vertexFormat: VertexFormat
	numDraws: number = 0

	curPrimitive: GLenum | null = null
	curTex: Texture | null = null
	curShader: Shader | null = null
	curUniform: Uniform = {}

	constructor(ctx: GfxCtx, format: VertexFormat, maxVertices: number, maxIndices: number) {

		const gl = ctx.gl

		this.vertexFormat = format
		this.ctx = ctx
		this.stride = format.reduce((sum, f) => sum + f.size, 0)
		this.maxVertices = maxVertices
		this.maxIndices = maxIndices

		this.glVBuf = gl.createBuffer()
		ctx.pushArrayBuffer(this.glVBuf)
		gl.bufferData(gl.ARRAY_BUFFER, maxVertices * 4, gl.DYNAMIC_DRAW)
		ctx.popArrayBuffer()

		this.glIBuf = gl.createBuffer()
		ctx.pushElementArrayBuffer(this.glIBuf)
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, maxIndices * 4, gl.DYNAMIC_DRAW)
		ctx.popElementArrayBuffer()

	}

	push(
		primitive: GLenum,
		verts: number[],
		indices: number[],
		shader: Shader,
		tex: Texture | null = null,
		uniform: Uniform = {},
	) {
		if (
			primitive !== this.curPrimitive
			|| tex !== this.curTex
			|| shader !== this.curShader
			|| !deepEq(this.curUniform, uniform)
			|| this.vqueue.length + verts.length * this.stride > this.maxVertices
			|| this.iqueue.length + indices.length > this.maxIndices
		) {
			this.flush()
		}
		const indexOffset = this.vqueue.length / this.stride
		for (const v of verts) {
			this.vqueue.push(v)
		}
		for (const i of indices) {
			this.iqueue.push(i + indexOffset)
		}
		this.curPrimitive = primitive
		this.curShader = shader
		this.curTex = tex
		this.curUniform = uniform
	}

	flush() {

		if (
			!this.curPrimitive
			|| !this.curShader
			|| this.vqueue.length === 0
			|| this.iqueue.length === 0
		) {
			return
		}

		const gl = this.ctx.gl

		this.ctx.pushArrayBuffer(this.glVBuf)
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(this.vqueue))
		this.ctx.pushElementArrayBuffer(this.glIBuf)
		gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(this.iqueue))
		this.ctx.setVertexFormat(this.vertexFormat)
		this.curShader.bind()
		this.curShader.send(this.curUniform)
		this.curTex?.bind()
		gl.drawElements(this.curPrimitive, this.iqueue.length, gl.UNSIGNED_SHORT, 0)
		this.curTex?.unbind()
		this.curShader.unbind()

		this.ctx.popArrayBuffer()
		this.ctx.popElementArrayBuffer()

		this.vqueue = []
		this.iqueue = []
		this.numDraws++

	}

	free() {
		const gl = this.ctx.gl
		gl.deleteBuffer(this.glVBuf)
		gl.deleteBuffer(this.glIBuf)
	}

}

export class Mesh {

	ctx: GfxCtx
	glVBuf: WebGLBuffer
	glIBuf: WebGLBuffer
	vertexFormat: VertexFormat
	count: number

	constructor(ctx: GfxCtx, format: VertexFormat, verts: number[], indices: number[]) {

		const gl = ctx.gl

		this.vertexFormat = format
		this.ctx = ctx

		this.glVBuf = gl.createBuffer()
		ctx.pushArrayBuffer(this.glVBuf)
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW)
		ctx.popArrayBuffer()

		this.glIBuf = gl.createBuffer()
		ctx.pushElementArrayBuffer(this.glIBuf)
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
		ctx.popElementArrayBuffer()

		this.count = indices.length

	}

	draw(primitive?: GLenum) {
		const gl = this.ctx.gl
		this.ctx.pushArrayBuffer(this.glVBuf)
		this.ctx.pushElementArrayBuffer(this.glIBuf)
		this.ctx.setVertexFormat(this.vertexFormat)
		gl.drawElements(primitive ?? gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0)
		this.ctx.popArrayBuffer()
		this.ctx.popElementArrayBuffer()
	}

	free() {
		const gl = this.ctx.gl
		gl.deleteBuffer(this.glVBuf)
		gl.deleteBuffer(this.glIBuf)
	}


}

function genStack<T>(setFunc: (item: T) => void) {
	const stack: T[] = []
	// TODO: don't do anything if pushed item is the same as the one on top?
	const push = (item: T) => {
		stack.push(item)
		setFunc(item)
	}
	const pop = () => {
		stack.pop()
		setFunc(cur() ?? null)
	}
	const cur = () => stack[stack.length - 1]
	return [push, pop, cur] as const
}

export default function initGfx(gl: WebGLRenderingContext, opts: {
	texFilter?: TexFilter,
} = {}) {

	const gc: Array<() => void> = []

	function onDestroy(action) {
		gc.push(action)
	}

	function destroy() {
		gc.forEach((action) => action())
		gl.getExtension("WEBGL_lose_context").loseContext()
	}

	let curVertexFormat = null

	function setVertexFormat(fmt: VertexFormat) {
		if (deepEq(fmt, curVertexFormat)) return
		curVertexFormat = fmt
		const stride = fmt.reduce((sum, f) => sum + f.size, 0)
		fmt.reduce((offset, f, i) => {
			gl.vertexAttribPointer(i, f.size, gl.FLOAT, false, stride * 4, offset)
			gl.enableVertexAttribArray(i)
			return offset + f.size * 4
		}, 0)
	}

	const [ pushTexture2D, popTexture2D ] =
		genStack<WebGLTexture>((t) => gl.bindTexture(gl.TEXTURE_2D, t))

	const [ pushArrayBuffer, popArrayBuffer ] =
		genStack<WebGLBuffer>((b) => gl.bindBuffer(gl.ARRAY_BUFFER, b))

	const [ pushElementArrayBuffer, popElementArrayBuffer ] =
		genStack<WebGLBuffer>((b) => gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b))

	const [ pushFramebuffer, popFramebuffer ] =
		genStack<WebGLFramebuffer>((b) => gl.bindFramebuffer(gl.FRAMEBUFFER, b))

	const [ pushRenderbuffer, popRenderbuffer ] =
		genStack<WebGLRenderbuffer>((b) => gl.bindRenderbuffer(gl.RENDERBUFFER, b))

	const [ pushViewport, popViewport ] =
		genStack<{ x: number, y: number, w: number, h: number }>(({ x, y, w, h }) => {
			gl.viewport(x, y, w, h)
		})

	const [ pushProgram, popProgram ] = genStack<WebGLProgram>((p) => gl.useProgram(p))

	pushViewport({ x: 0, y: 0, w: gl.drawingBufferWidth, h: gl.drawingBufferHeight })

	return {
		gl,
		opts,
		onDestroy,
		destroy,
		pushTexture2D,
		popTexture2D,
		pushArrayBuffer,
		popArrayBuffer,
		pushElementArrayBuffer,
		popElementArrayBuffer,
		pushFramebuffer,
		popFramebuffer,
		pushRenderbuffer,
		popRenderbuffer,
		pushViewport,
		popViewport,
		pushProgram,
		popProgram,
		setVertexFormat,
	}

}
