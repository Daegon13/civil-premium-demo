"""
Blender bpy script (v2): Hero architectural pavilion premium/commercial (GLB-ready).

Objetivo:
- Segunda versión con más intención visual para una landing web.
- Mejor silueta y proporciones elegantes sin perder optimización low/mid poly.
- Compatibilidad con exportación glTF/GLB.

Uso rápido:
1) Abrir Blender.
2) Scripting > New.
3) Pegar este script y ejecutar.
4) Ajustar CONFIG según necesidad.
"""

import bpy
import math
from mathutils import Vector


# ==========================================================
# CONFIGURACIÓN GLOBAL (editable)
# ==========================================================
CONFIG = {
    # Escala base y proporciones generales
    "base_length": 20.0,
    "base_width": 9.0,
    "platform_height": 0.38,
    "platform_chamfer": 0.035,

    # Ritmo estructural (menos repetitivo que el blockout)
    "num_portals": 5,
    "portal_spacing": 3.35,
    "portal_depth": 0.20,
    "portal_leg_width": 0.24,
    "portal_head_height": 5.35,
    "portal_variation": 0.18,  # variación suave en escala para romper repetición

    # Cubierta delgada y limpia
    "roof_thickness": 0.115,
    "roof_width_scale": 0.93,
    "roof_overhang_x": 1.35,
    "roof_overhang_y": 0.35,
    "roof_tilt_deg": 3.2,

    # Aletas/paneles verticales integrados (intencionales)
    "fin_count_per_side": 4,
    "fin_thickness": 0.09,
    "fin_height": 3.2,
    "fin_depth": 0.56,
    "fin_inset_x": 1.1,

    # Vidrio continuo lateral
    "glass_height": 2.85,
    "glass_thickness": 0.045,
    "glass_inset_y": 0.58,

    # Composición central (en vez de monolito rígido)
    "spine_width": 0.42,
    "spine_height": 0.22,

    # Escena comercial
    "ground_size": 54.0,
    "background_strength": 0.48,

    # Exportación GLB
    "do_export_glb": False,
    "export_path": "//hero_pavilion_premium_v2.glb",  # // = relativo al .blend

    # Ayuda visual
    "set_viewport_shading_to_material": True,
}


# ==========================================================
# UTILIDADES GENERALES
# ==========================================================
def clean_scene():
    """Limpia escena para reproducibilidad."""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

    for block in bpy.data.meshes:
        bpy.data.meshes.remove(block)
    for block in bpy.data.materials:
        bpy.data.materials.remove(block)
    for block in bpy.data.cameras:
        bpy.data.cameras.remove(block)
    for block in bpy.data.lights:
        bpy.data.lights.remove(block)
    for block in bpy.data.worlds:
        if block.users == 0:
            bpy.data.worlds.remove(block)


def ensure_collection(name="HeroPremiumV2"):
    """Crea colección de trabajo."""
    scene = bpy.context.scene
    col = bpy.data.collections.new(name)
    scene.collection.children.link(col)
    return col


def link_to_collection(obj, col):
    """Mueve un objeto a la colección dada."""
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    col.objects.link(obj)


def assign_material(obj, mat):
    """Asigna material único."""
    obj.data.materials.clear()
    obj.data.materials.append(mat)


def add_bevel_modifier(obj, amount=0.02, segments=1, profile=0.7):
    """Bisel mínimo para captar highlights sin inflar polígonos."""
    bev = obj.modifiers.new(name="Bevel", type='BEVEL')
    bev.width = amount
    bev.segments = segments
    bev.profile = profile
    bev.limit_method = 'ANGLE'
    bev.angle_limit = math.radians(35.0)


def set_color_management_look(scene, preferred_looks):
    """Selecciona look robusto entre variantes de Blender."""
    look_prop = scene.view_settings.bl_rna.properties.get("look")
    if look_prop is None:
        return None

    available = {item.identifier for item in look_prop.enum_items}
    for look_name in preferred_looks:
        if look_name in available:
            scene.view_settings.look = look_name
            return look_name
    return None


def create_box(name, size, location, collection, material=None, rotation=(0.0, 0.0, 0.0)):
    """Crea caja simple con tamaño exacto (low/mid poly)."""
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size[0] * 0.5, size[1] * 0.5, size[2] * 0.5)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    link_to_collection(obj, collection)
    if material:
        assign_material(obj, material)
    return obj


# ==========================================================
# MATERIALES (3 materiales principales)
# ==========================================================
def create_materials(cfg):
    """Materiales PBR sobrios: hormigón, metal oscuro y vidrio."""
    mats = {}

    def set_bsdf_input(bsdf_node, socket_names, value):
        for socket_name in socket_names:
            socket = bsdf_node.inputs.get(socket_name)
            if socket is not None:
                socket.default_value = value
                return

    # Hormigón
    concrete = bpy.data.materials.new("M_Concrete")
    concrete.use_nodes = True
    bsdf = concrete.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.62, 0.64, 0.66, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.84
    bsdf.inputs["Metallic"].default_value = 0.0
    mats["concrete"] = concrete

    # Metal oscuro
    metal = bpy.data.materials.new("M_DarkMetal")
    metal.use_nodes = True
    bsdf = metal.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.06, 0.07, 0.09, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.26
    bsdf.inputs["Metallic"].default_value = 0.98
    mats["metal"] = metal

    # Vidrio
    glass = bpy.data.materials.new("M_Glass")
    glass.use_nodes = True
    bsdf = glass.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.76, 0.86, 0.92, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.05
    bsdf.inputs["Metallic"].default_value = 0.0
    set_bsdf_input(bsdf, ["Transmission Weight", "Transmission"], 0.92)
    bsdf.inputs["IOR"].default_value = 1.45

    glass.blend_method = 'BLEND'
    if hasattr(glass, "shadow_method"):
        glass.shadow_method = 'HASHED'
    mats["glass"] = glass

    # Fondo oscuro neutro
    world = bpy.data.worlds.new("HeroWorld")
    bpy.context.scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs[0].default_value = (0.035, 0.038, 0.045, 1.0)
    bg.inputs[1].default_value = cfg["background_strength"]

    return mats


# ==========================================================
# CONSTRUCCIÓN DE PIEZA HERO PREMIUM
# ==========================================================
def build_hero_pavilion(cfg, col, mats):
    """
    Construye una pieza arquitectónica más comercial:
    - Plataforma refinada
    - Portales con variación rítmica (menos repetición)
    - Cubierta delgada flotante
    - Paneles/fins laterales intencionales + vidrio continuo
    - Volumen central reemplazado por espina compositiva minimal
    """
    # ---------- Medidas derivadas ----------
    n = cfg["num_portals"]
    spacing = cfg["portal_spacing"]
    total_x = (n - 1) * spacing
    x_start = -total_x * 0.5

    base_len = cfg["base_length"]
    base_w = cfg["base_width"]
    plinth_h = cfg["platform_height"]

    leg_w = cfg["portal_leg_width"]
    portal_d = cfg["portal_depth"]
    head_z = cfg["portal_head_height"]

    # ---------- 1) Plataforma ----------
    platform = create_box(
        name="BasePlatform",
        size=(base_len, base_w, plinth_h),
        location=(0.0, 0.0, plinth_h * 0.5),
        collection=col,
        material=mats["concrete"],
    )
    add_bevel_modifier(platform, amount=cfg["platform_chamfer"], segments=1)

    # Base secundaria (zócalo) para hacer la pieza más "producto" de hero
    plinth = create_box(
        name="DisplayPlinth",
        size=(base_len * 0.82, base_w * 0.74, 0.14),
        location=(0.0, 0.0, plinth_h + 0.07),
        collection=col,
        material=mats["concrete"],
    )
    add_bevel_modifier(plinth, amount=0.018, segments=1)

    # ---------- 2) Portales con variación sutil ----------
    clear_y = base_w * 0.5 - leg_w * 0.6 - 0.42

    for i in range(n):
        x = x_start + i * spacing

        # Variación simétrica para evitar repetición excesiva
        center_dist = abs(i - (n - 1) * 0.5)
        taper = 1.0 - (center_dist / max(1.0, (n - 1) * 0.5)) * cfg["portal_variation"]

        leg_height = head_z * taper
        beam_thickness = 0.19 * taper
        beam_width_y = (clear_y * 2.0) + leg_w * 0.62

        z_leg = plinth_h + leg_height * 0.5
        z_beam = plinth_h + leg_height - beam_thickness * 0.5

        # Pierna izquierda
        left_leg = create_box(
            name=f"PortalLegL_{i:02d}",
            size=(leg_w, portal_d, leg_height),
            location=(x, -clear_y, z_leg),
            collection=col,
            material=mats["metal"],
        )

        # Pierna derecha
        right_leg = create_box(
            name=f"PortalLegR_{i:02d}",
            size=(leg_w, portal_d, leg_height),
            location=(x, clear_y, z_leg),
            collection=col,
            material=mats["metal"],
        )

        # Cabezal
        head = create_box(
            name=f"PortalHead_{i:02d}",
            size=(leg_w, beam_width_y, beam_thickness),
            location=(x, 0.0, z_beam),
            collection=col,
            material=mats["metal"],
        )

        # Bisel mínimo sólo en elementos principales
        if i in {0, n - 1, int((n - 1) * 0.5)}:
            add_bevel_modifier(left_leg, amount=0.012, segments=1)
            add_bevel_modifier(right_leg, amount=0.012, segments=1)
            add_bevel_modifier(head, amount=0.012, segments=1)

    # ---------- 3) Cubierta delgada ----------
    roof_len = total_x + cfg["roof_overhang_x"] * 2.0
    roof_w = base_w * cfg["roof_width_scale"] + cfg["roof_overhang_y"]
    roof_z = plinth_h + head_z + cfg["roof_thickness"] * 0.72
    roof_rot = (math.radians(cfg["roof_tilt_deg"]), 0.0, 0.0)

    roof = create_box(
        name="RoofPlane",
        size=(roof_len, roof_w, cfg["roof_thickness"]),
        location=(0.0, 0.0, roof_z),
        collection=col,
        material=mats["concrete"],
        rotation=roof_rot,
    )
    add_bevel_modifier(roof, amount=0.01, segments=1)

    # Perfil metálico fino para lectura de borde premium
    roof_trim = create_box(
        name="RoofEdgeTrim",
        size=(roof_len * 0.97, roof_w * 0.965, 0.03),
        location=(0.0, 0.0, roof_z - cfg["roof_thickness"] * 0.32),
        collection=col,
        material=mats["metal"],
        rotation=roof_rot,
    )

    # ---------- 4) Panels laterales intencionales + vidrio ----------
    fin_count = max(2, cfg["fin_count_per_side"])
    fin_span_x = total_x + spacing * 0.78
    fin_step = fin_span_x / (fin_count - 1)
    fin_x0 = -fin_span_x * 0.5

    fin_z = plinth_h + cfg["fin_height"] * 0.5
    fin_y = base_w * 0.5 - cfg["glass_inset_y"]

    for side in (-1.0, 1.0):
        for j in range(fin_count):
            x_fin = fin_x0 + j * fin_step

            # Pequeño gradiente de altura para dinámica visual
            t = j / (fin_count - 1)
            h_scale = 0.9 + 0.2 * (1.0 - abs(t - 0.5) * 2.0)

            create_box(
                name=f"SideFin_{'L' if side < 0 else 'R'}_{j:02d}",
                size=(cfg["fin_thickness"], cfg["fin_depth"], cfg["fin_height"] * h_scale),
                location=(x_fin, side * fin_y, fin_z * h_scale),
                collection=col,
                material=mats["metal"],
            )

    # Franja de vidrio longitudinal continua para integrar los fins
    glass_len = total_x + spacing * 0.95
    glass_z = plinth_h + cfg["glass_height"] * 0.5
    glass_y = base_w * 0.5 - cfg["glass_inset_y"]

    create_box(
        name="GlassRibbon_Left",
        size=(glass_len, cfg["glass_thickness"], cfg["glass_height"]),
        location=(0.0, -glass_y, glass_z),
        collection=col,
        material=mats["glass"],
    )

    create_box(
        name="GlassRibbon_Right",
        size=(glass_len, cfg["glass_thickness"], cfg["glass_height"]),
        location=(0.0, glass_y, glass_z),
        collection=col,
        material=mats["glass"],
    )

    # ---------- 5) Espina central compositiva (reemplaza monolito) ----------
    spine = create_box(
        name="CentralSpine",
        size=(total_x * 0.86, cfg["spine_width"], cfg["spine_height"]),
        location=(0.0, 0.0, plinth_h + 0.36),
        collection=col,
        material=mats["metal"],
    )
    add_bevel_modifier(spine, amount=0.01, segments=1)

    # Alineación limpia: aplicar rotación y normalizar escalas
    for obj in col.objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = platform
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    bpy.ops.object.select_all(action='DESELECT')


# ==========================================================
# CÁMARA, LUZ Y FONDO
# ==========================================================
def setup_camera_and_light(cfg):
    """Escena comercial: cámara oblicua + luz principal + relleno suave."""
    scene = bpy.context.scene

    # Cámara hero (composición 3/4)
    cam_data = bpy.data.cameras.new("HeroCamera")
    cam = bpy.data.objects.new("HeroCamera", cam_data)
    scene.collection.objects.link(cam)

    cam.location = Vector((12.6, -11.4, 7.0))
    target = Vector((0.0, 0.0, 2.45))
    direction = target - cam.location
    cam.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()

    cam_data.lens = 50
    cam_data.sensor_width = 36
    cam_data.clip_start = 0.1
    cam_data.clip_end = 500
    scene.camera = cam

    # Luz principal
    key_data = bpy.data.lights.new(name="KeySun", type='SUN')
    key = bpy.data.objects.new(name="KeySun", object_data=key_data)
    scene.collection.objects.link(key)

    key.location = (10.0, -8.2, 14.5)
    key.rotation_euler = (math.radians(52.0), math.radians(4.0), math.radians(29.0))
    key_data.energy = 3.7
    key_data.angle = math.radians(0.42)

    # Luz de relleno suave para separar silueta del fondo
    fill_data = bpy.data.lights.new(name="FillArea", type='AREA')
    fill = bpy.data.objects.new(name="FillArea", object_data=fill_data)
    scene.collection.objects.link(fill)

    fill.location = (-6.5, 8.0, 5.3)
    fill.rotation_euler = (math.radians(76.0), 0.0, math.radians(-42.0))
    fill_data.energy = 70
    fill_data.color = (0.78, 0.82, 0.9)
    fill_data.size = 6.2

    # Plano de suelo neutro oscuro
    bpy.ops.mesh.primitive_plane_add(location=(0.0, 0.0, 0.0), size=cfg["ground_size"])
    ground = bpy.context.active_object
    ground.name = "GroundPlane"

    ground_mat = bpy.data.materials.new("M_Ground")
    ground_mat.use_nodes = True
    bsdf = ground_mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.045, 0.05, 0.058, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.92
    assign_material(ground, ground_mat)

    # Color management con fallback entre versiones
    set_color_management_look(
        scene,
        preferred_looks=[
            "AgX - Medium High Contrast",
            "Medium High Contrast",
            "AgX - High Contrast",
            "High Contrast",
            "None",
        ],
    )


# ==========================================================
# EXPORTACIÓN GLB
# ==========================================================
def export_glb_if_needed(cfg):
    """Exporta GLB con settings simples y compatibles."""
    if not cfg["do_export_glb"]:
        return

    bpy.ops.export_scene.gltf(
        filepath=cfg["export_path"],
        export_format='GLB',
        export_yup=True,
        export_apply=True,
        export_texcoords=True,
        export_normals=True,
        export_tangents=False,
        export_materials='EXPORT',
        export_colors=False,
        use_selection=False,
    )
    print(f"[OK] GLB exportado en: {cfg['export_path']}")


# ==========================================================
# MAIN
# ==========================================================
def main():
    clean_scene()
    work_col = ensure_collection("HeroPavilionPremiumV2")
    mats = create_materials(CONFIG)

    build_hero_pavilion(CONFIG, work_col, mats)
    setup_camera_and_light(CONFIG)

    if CONFIG["set_viewport_shading_to_material"] and bpy.context.screen is not None:
        for area in bpy.context.screen.areas:
            if area.type == 'VIEW_3D':
                for space in area.spaces:
                    if space.type == 'VIEW_3D':
                        space.shading.type = 'MATERIAL'

    export_glb_if_needed(CONFIG)
    print("[OK] Hero pavilion premium v2 generado.")


if __name__ == "__main__":
    main()
